import { useEffect, useState } from "react";
import "./App.css";

import { ResponsiveTreeMapHtml } from "@nivo/treemap";

interface DataContributionMeta {
  department: string;
  description: string;
  datasets: number;
}

interface ViewOptions {
  hierarchy: "show" | "ignore";
  showOnlyMinistries: boolean;
}

function App() {
  const [data, setData] = useState<DataContributionMeta[] | null>(null);
  const [viewOptions, setViewOptions] = useState<ViewOptions>({
    hierarchy: "show",
    showOnlyMinistries: false,
  });

  useEffect(() => {
    fetch("/backend-response.json")
      .then((data) => data.json())
      .then((data) => setData(data as DataContributionMeta[]));
  }, []);

  return (
    <>
      <h1>
        Data sets provided to <a href="https://www.govdata.de/">GovData.de</a>{" "}
      </h1>
      <div className="view-options">
        <label>
          <input
            type="checkbox"
            checked={viewOptions.showOnlyMinistries}
            onChange={(e) =>
              setViewOptions((v) => ({
                ...v,
                showOnlyMinistries: e.target.checked,
              }))
            }
          />
          Show only ministries
        </label>
        <label>
          <input
            type="checkbox"
            checked={viewOptions.hierarchy === "show"}
            onChange={(e) =>
              setViewOptions((v) => ({
                ...v,
                hierarchy: e.target.checked ? "show" : "ignore",
              }))
            }
          />
          Show departments, public-law institutions, and data catalogs under
          their supervising ministry
        </label>
      </div>
      {data ? (
        <Treemap data={data} viewOptions={viewOptions} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

const parentOrganizations = {
  "Statistisches Bundesamt": "Bundesministerium des Innern",
  mCLOUD: "Bundesministerium für Digitales und Verkehr",
  "Bundesamt für Justiz": "Bundesministerium der Justiz",
  "Deutsches Patent- und Markenamt": "Bundesministerium der Justiz",
  "Bundesanstalt für Arbeitsschutz und Arbeitsmedizin":
    "Bundesministerium für Arbeit und Soziales",
};

type DataContributionMetaWithChildren = DataContributionMeta & {
  children: DataContributionMeta[];
};

const Treemap: React.FC<{
  data: DataContributionMeta[];
  viewOptions: ViewOptions;
}> = ({ data, viewOptions }) => {
  const isMinistry = (datum: DataContributionMeta) =>
    datum.department.toLowerCase().includes("bundesministerium") ||
    datum.department.toLowerCase() === "auswärtiges amt";

  const ministryData: Record<string, DataContributionMetaWithChildren> = {};
  const otherData = [];
  for (const datum of data) {
    if (isMinistry(datum)) {
      ministryData[datum.department] = { ...datum, children: [] };
    } else {
      otherData.push(datum);
    }
  }

  const unassignedData = [];
  for (const datum of otherData) {
    const parentDepartment = parentOrganizations[
      datum.department.trim() as keyof typeof parentOrganizations
    ] as string | undefined;
    if (viewOptions.hierarchy === "show" && parentDepartment) {
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

  let rootDataElement;

  if (viewOptions.showOnlyMinistries) {
    rootDataElement = {
      department: "Federal ministries",
      children: Object.values(ministryData),
    };
  } else {
    rootDataElement = {
      children: [
        {
          department: "Federal ministries",
          children: Object.values(ministryData),
        },
        { department: "Other", children: unassignedData },
      ],
    };
  }
  return (
    <div className="treemap-container">
      {" "}
      <ResponsiveTreeMapHtml
        data={rootDataElement}
        identity="department"
        value="datasets"
        label={"id"}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        outerPadding={4}
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

export default App;
