import React from "react";

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./style.css";
const TimeGraph = ({ data }) => {
  const style = {
    // top: "100%",
    // left: "50%",

    right: 0,
    // transform: "translate(-50%,-50%)",
    margin: "auto",
    lineHeight: "10px",
    display: "flex",
    // fontSize: "12px",
  };

  return (
    <div className="h-100 w-100 position-relative">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="47%"
          innerRadius="70%"
          outerRadius="130%"
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
                  className="mt-4 w-100 d-flex justify-content-center ms-5 mx-auto"
                  style={{
                    display: "flex",

                    marginBottom: "-50px",
                    position: "absolute",
                    top: "-14px",
                    margin: 0,
                    left: "-16px",
                  }}
                >
                  {payload.map((entry, index) => (
                    <li
                      key={`item-${index}`}
                      style={{
                        margin: "0 20px",
                        color: entry.color,
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {`${entry.value}`}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-white   graphText d-flex flex-column text-center">
        <h5>3Sec</h5>
        <p style={{ fontSize: "12px" }}>Avg.Time</p>
      </div>
    </div>
  );
};

export default TimeGraph;
