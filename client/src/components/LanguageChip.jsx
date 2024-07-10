import React from "react";
import { ukFlagSvg } from "../constants/svgs";
const LanguageChip = () => {
  return (
    <div className="iconwithTextChip text-xs">
      {ukFlagSvg}
      <span className="text-xs">English</span>
    </div>
  );
};

export default LanguageChip;
