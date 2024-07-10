import React from "react";
import { LogoMain, LogoSm } from "../constants/images";
import Navlinks from "./Navlinks";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar position-fixed rounded-sm px-2 py-3 d-flex flex-column displayMainView">
      <NavLink className=" justify-content-center d-none d-lg-flex" to="/">
        <img src={LogoMain} alt="logo" />
      </NavLink>
      <NavLink
        className="d-flex justify-content-center d-flex d-lg-none"
        to="/"
      >
        <img src={LogoSm} alt="logo" />
      </NavLink>
      <Navlinks />
    </div>
  );
};

export default Sidebar;
