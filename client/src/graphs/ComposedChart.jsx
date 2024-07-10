import React from "react";
import {
  ComposedChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle}>
        <div style={contentStyle}>{payload[0].value}</div>
        <div style={dateStyle}>{label}</div>
      </div>
    );
  }
  return null;
};

const tooltipStyle = {
  backgroundColor: "#17323A",
  color: "#fff",
  padding: "10px",
  borderRadius: "6px",
  textAlign: "center",
  position: "relative",
};

const contentStyle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const dateStyle = {
  fontSize: "16px",
  color: "#B0B0B0",
};

const arrowStyle = {
  content: '""',
  position: "absolute",
  bottom: "-5px",
  left: "50%",
  marginLeft: "-5px",
  borderWidth: "5px",
  borderStyle: "solid",
  borderColor: "#17323A transparent transparent transparent",
};

const data = [
  { name: "Jan", amt: 150 },
  { name: "Feb", amt: 450 },
  { name: "Mar", amt: 900 },
  { name: "Apr", amt: 700 },
  { name: "May", amt: 300 },
  { name: "Jun", amt: 850 },
  { name: "Jul", amt: 400 },
  { name: "Aug", amt: 600 },
  { name: "Sep", amt: 750 },
  { name: "Oct", amt: 500 },
  { name: "Nov", amt: 950 },
  { name: "Dec", amt: 200 },
];

const ComposedBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="none" />
        <XAxis
          dataKey="name"
          label={{
            value: "",
            color: "red",
            position: "insideBottomRight",
            offset: 2,
          }}
          scale="band"
        />

        <Tooltip content={<CustomTooltip />} />

        <Area type="natural" dataKey="amt" fill="#00BACB17" stroke="#00BACB" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedBarChart;
