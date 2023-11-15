import { useEffect, useState } from "react";
import "./App.css";

import { ResponsiveTreeMapHtml } from "@nivo/treemap";

interface DataContributionMeta {
  department: string;
  description: string;
  datasets: number;
}

function App() {
  const [data, setData] = useState<DataContributionMeta[] | null>(null);

  useEffect(() => {
    fetch("/backend-response.json")
      .then((data) => data.json())
      .then((data) => setData(data as DataContributionMeta[]));
  }, []);

  return (
    <>
      <h1>
        Data sets provided to <a href="https://www.govdata.de/">GovData.de</a>{" "}
        by federal ministries
      </h1>
      {data ? <Treemap data={data} /> : <div>Loading...</div>}
    </>
  );
}

const Treemap: React.FC<{ data: DataContributionMeta[] }> = ({ data }) => {
  const isMinistry = (datum: DataContributionMeta) =>
    datum.department.includes("Bundesministerium");

  const rootDataElement = {
    children: [
      { department: "Federal ministries", children: data.filter(isMinistry) },
      { department: "Other", children: data.filter((d) => !isMinistry(d)) },
    ],
  };
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
