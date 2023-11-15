import { describe, it, expect } from "@jest/globals";
import { DataContributionMeta } from "../App";
import { partitionAndAssignData } from "./DataView.logic";

const ministry = {
  department: "Bundesministerium des Innern",
  description: "Bundesministerium des Innern",
  datasets: 722,
};
const ministrySubOrganization = {
  department: "Statistisches Bundesamt",
  description: "Statistisches Bundesamt",
  datasets: 2372,
};
const nonMinistry = {
  department: "Unternehmen GmbH",
  description: "Not a public entity",
  datasets: 0,
};
const input: DataContributionMeta[] = [
  ministrySubOrganization,
  ministry,
  nonMinistry,
];

describe("partitionAndAssignData", () => {
  it("correctly partitions ministries and non-ministries", () => {
    const result = partitionAndAssignData(input, { assignHierarchy: false });
    expect(result.ministryData).toHaveLength(1);
    expect(result.ministryData[0]).toMatchObject(ministry);
    expect(result.unassignedData).toStrictEqual([
      ministrySubOrganization,
      nonMinistry,
    ]);
  });

  it("correctly assigns non-ministries to ministries", () => {
    const result = partitionAndAssignData(input, { assignHierarchy: true });
    expect(result.ministryData).toHaveLength(1);
    expect(result.ministryData[0]).toMatchObject(ministry);
    expect(result.ministryData[0].children).toStrictEqual([
      ministrySubOrganization,
    ]);
    expect(result.unassignedData).toStrictEqual([nonMinistry]);
  });

  it("doesn't add children properties to the input", () => {
    input.forEach((element) => {
      expect(element).not.toHaveProperty("children");
    });
  });
});
