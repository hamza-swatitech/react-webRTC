import React from "react";

const IconWrapper = ({ children, handleClick, index, isActive, activeSvg }) => {
  return (
    <div
      className={`${
        isActive && "iconWrapperActive"
      } iconWrapper cursor-pointer  py-2 px-2 d-flex justify-content-center align-items-center bgMain`}
      onClick={() => handleClick(index)}
      role="button"
    >
      {isActive ? activeSvg : children}
    </div>
  );
};

export default IconWrapper;
