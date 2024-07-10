import React from "react";
import GraphCard from "../components/GraphCard";
import IncidentChart from "../graphs/IncidentChart ";
import TimeGraph from "../graphs/TimeGraph";
import ComposedBarChart from "../graphs/ComposedChart";
import Table from "../components/Table";

const Home = () => {
  const headings = ["Time", "Activity", "Camera"];
  const options = ["last month", "last week", "last month"];
  const yearOptions = ["2020", "2021", "2022", "2023", "2024"];
  const data1 = [
    {
      name: "Major",
      uv: 85, // Represents 50% coverage
      fill: "#FFC300",
      stroke: "#081C24",
    },
    {
      name: "Minor",
      uv: 15, // Represents 80% coverage
      fill: "#00FFFB",
    },
    {
      name: "",
      uv: 100,
      fill: "#081c24",
      stroke: "#081c24",
    },
  ];
  const data2 = [
    {
      name: "Seconds",
      uv: 15, // Represents 80% coverage
      fill: "#34A853",
    },
    {
      name: "Minutes",
      uv: 15, // Represents 80% coverage
      fill: "#00FFFB",
    },
    {
      name: "Hours",
      uv: 85, // Represents 50% coverage
      fill: "#4285F4",
      stroke: "#081C24",
    },

    {
      name: "",
      uv: 100,
      fill: "#081c24",
      stroke: "#081c24",
    },
  ];

  return (
    <div className="container-fluid mt-2">
      <div className="row gy-4">
        <div className="col-md-6 col-12">
          {/* <GraphCard data={data1} placeholder="Total incidents" /> */}
          <GraphCard title="Total incidents" options={options}>
            <IncidentChart data={data1} placeholder="Total Incidents" />
          </GraphCard>
        </div>
        <div className="col-md-6 col-12">
          <GraphCard title="Avg Incident Solution Time" options={options}>
            <TimeGraph data={data2} placeholder="Graph 2" />
          </GraphCard>
        </div>
        <div className="col-12">
          <GraphCard title="Incidents by Month" options={yearOptions}>
            <ComposedBarChart />
          </GraphCard>
        </div>
        <div className="col-md-12 " style={{ height: "300px" }}>
          <Table headings={headings} />
        </div>
      </div>
    </div>
  );
};

export default Home;
