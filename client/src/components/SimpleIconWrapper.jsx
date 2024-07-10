import React from "react";

const SimpleIconWrapper = ({ children, handleClick, isRed }) => {
  return (
    <div
      className={`simpleIconWrapper cursor-pointer  py-1 px-1 d-flex justify-content-center align-items-center `}
      onClick={handleClick}
      style={{ backgroundColor: isRed ? "#5D272A" : "#001016" }}
    >
      {children}
    </div>
  );
};

export default SimpleIconWrapper;
