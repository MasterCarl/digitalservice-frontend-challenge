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

/**
 * This is the main UI element that takes the loaded data, lets the user adjust display options,
 * and renders it accordingly using child components.
 */
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

  // if only ministries are shown, there is only one relevant level of hierarchy
  // and the display can be simplified
  const isSingleLevel =
    viewOptions.hierarchy === "ignore" && viewOptions.showOnlyMinistries;
  return (
    <>
      <ViewControls viewOptions={viewOptions} onChange={setViewOptions} />
      <Treemap data={rootDataElement} leavesOnly={isSingleLevel} />
    </>
  );
};
