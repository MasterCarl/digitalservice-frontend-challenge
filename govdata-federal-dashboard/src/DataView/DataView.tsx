import { DataContributionMeta } from "../App";
import { useState } from "react";
import { ViewControls } from "./ViewControls";
import { Treemap } from "./Treemap";
import { partitionAndAssignData, buildRootDataElement } from "./DataView.logic";

export interface ViewOptions {
  hierarchy: "show" | "ignore";
  showOnlyMinistries: boolean;
}
const defaultViewOptions: ViewOptions = {
  hierarchy: "show",
  showOnlyMinistries: true,
};

interface DataViewProps {
  data: DataContributionMeta[];
}

export const DataView: React.FC<DataViewProps> = ({ data }) => {
  const [viewOptions, setViewOptions] =
    useState<ViewOptions>(defaultViewOptions);

  const { ministryData, unassignedData } = partitionAndAssignData(data, {
    assignHierarchy: viewOptions.hierarchy === "show",
  });

  const rootDataElement = buildRootDataElement(
    ministryData,
    unassignedData,
    viewOptions
  );

  return (
    <>
      <ViewControls viewOptions={viewOptions} onChange={setViewOptions} />
      <Treemap
        data={rootDataElement}
        leavesOnly={
          viewOptions.hierarchy === "ignore" && viewOptions.showOnlyMinistries
        }
      />
    </>
  );
};
