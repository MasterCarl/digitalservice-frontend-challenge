import { useEffect, useState } from "react";
import "./App.css";

import { DataView } from "./DataView/DataView";

export interface DataContributionMeta {
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
      </h1>

      {data ? <DataView data={data} /> : <div>Loading...</div>}
      {/* TODO: Handle loading errors */}
    </>
  );
}

export default App;
