import { ResponsiveTreeMapHtml } from "@nivo/treemap";
import "./Treemap.css";

export const Treemap: React.FC<{
  data: { department: string; children: Array<unknown> };
  leavesOnly?: boolean;
}> = ({ data, leavesOnly }) => {
  return (
    <div className="treemap-container">
      <ResponsiveTreeMapHtml
        data={data}
        identity="department"
        value="datasets"
        tile="binary"
        label={(e) => `${e.id}: ${e.formattedValue}`}
        parentLabel={(e) => `${e.id}: ${e.formattedValue}`}
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        leavesOnly={leavesOnly}
        outerPadding={8}
        innerPadding={2}
        parentLabelTextColor={{
          from: "color",
          modifiers: [["darker", 3]],
        }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.1]],
        }}
      />
    </div>
  );
};
