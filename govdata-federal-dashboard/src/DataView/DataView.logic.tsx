import { DataContributionMeta } from "../App";
import {
  isMinistry,
  parentOrganizationMap,
} from "../definitions/domainKnowledge";
import { ViewOptions } from "./DataView";

type DataContributionMetaWithChildren = DataContributionMeta & {
  children: DataContributionMeta[];
};

/**
 * Partition the data into ministries and non-ministries,
 * optionally adding known sub-units to the "children" property of each ministry.
 */
export function partitionAndAssignData(
  data: DataContributionMeta[],
  options: { assignHierarchy: boolean }
) {
  const ministries: Record<string, DataContributionMetaWithChildren> = {};
  const nonMinistries = [];
  for (const datum of data) {
    if (isMinistry(datum)) {
      ministries[datum.department] = { ...datum, children: [] };
    } else {
      nonMinistries.push(datum);
    }
  }

  let unassignedNonMinistries: DataContributionMeta[] = [];
  if (options.assignHierarchy) {
    assignUnassignedDepartments(
      ministries,
      nonMinistries,
      unassignedNonMinistries
    );
  } else {
    unassignedNonMinistries = nonMinistries;
  }
  return {
    ministryData: [...Object.values(ministries)],
    unassignedData: unassignedNonMinistries,
  };
}

function assignUnassignedDepartments(
  ministryData: Record<string, DataContributionMetaWithChildren>,
  otherData: DataContributionMeta[],
  unassignedData: DataContributionMeta[]
) {
  for (const datum of otherData) {
    const parentDepartment = parentOrganizationMap[
      datum.department.trim() as keyof typeof parentOrganizationMap
    ] as string | undefined;
    if (parentDepartment) {
      if (ministryData[parentDepartment]) {
        ministryData[parentDepartment].children.push(datum);
      } else {
        ministryData[parentDepartment] = {
          department: parentDepartment,
          description: "",
          datasets: 0,
          children: [datum],
        };
      }
    } else {
      unassignedData.push(datum);
    }
  }
}

export function buildRootDataElement(
  ministryData: DataContributionMetaWithChildren[],
  unassignedData: DataContributionMeta[],
  viewOptions: ViewOptions
) {
  let rootDataElement: {
    department: string;
    children: Array<unknown>;
  };

  if (viewOptions.showOnlyMinistries) {
    rootDataElement = {
      department: "Federal ministries",
      children: [...Object.values(ministryData)],
    };
  } else {
    rootDataElement = {
      department: "All data set providers",
      children: [
        {
          department: "Federal ministries",
          children: [...Object.values(ministryData)],
        },
        { department: "Other", children: unassignedData },
      ],
    };
  }
  return rootDataElement;
}
