import React from "react";

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./style.css";
const IncidentChart = ({ data, placeholder }) => {
  const style = {
    right: 0,

    lineHeight: "10px",
  };
  const totalValue = data?.slice(0, -1).reduce((acc, curr) => acc + curr.uv, 0);

  return (
    <div className="h-100 w-100 position-relative">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="48%"
          innerRadius="110%"
          outerRadius="50%"
          startAngle={30}
          endAngle={410} // 360 + 90 to make a full circle
          barSize={5}
          data={data}
        >
          <RadialBar
            minAngle={22}
            clockWise
            dataKey="uv"
            background="orange"
            cornerRadius="innerRadius"
            // stroke="#081c24"
          />
          <Legend
            iconSize={10}
            layout="horizontal" // Change to horizontal
            verticalAlign="bottom"
            align="center"
            wrapperStyle={style} // Adjust as needed
            content={(props) => {
              const { payload } = props;
              return (
                <ul
                  className="w-100 d-flex justify-content-center ms-5 "
                  style={{
                    padding: 0,
                    margin: 0,
                    marginBottom: "-50px",
                    position: "absolute",
                    top: "10px",
                  }}
                >
                  {payload.map((entry, index) => (
                    <li
                      key={`item-${index}`}
                      style={{
                        margin: "0 20px",
                        color: entry.color,
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {`${entry.value} ${data[index].uv}%`}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-white   graphText d-flex flex-column text-center">
        <h5>{totalValue}</h5>
        {/* <p className="fs-6">{placeholder}</p> */}
      </div>
    </div>
  );
};

export default IncidentChart;
