import React from "react";
import CustomDropdown from "../custom/dropdown/CustomDropdown";
const GraphCard = ({ title, children, options }) => {
  return (
    <div
      className="d-flex flex-column gap-2 w-full rounded p-3 bg-card"
      style={{ border: "1px solid #00353A" }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center">
        <h5 className="text-main flex-grow-1">{title}</h5>

        <CustomDropdown options={options} />
      </div>
      <div
        className="d-flex pb-2 justify-content-center "
        style={{ height: "155px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default GraphCard;
