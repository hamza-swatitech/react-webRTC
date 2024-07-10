import React from "react";
import { links } from "../constants/navlinks";
import { NavLink, useLocation } from "react-router-dom";
const Navlinks = () => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column gap-2 mt-5 px-2 ">
      {links.map((link, index) => (
        <NavLink
          key={index}
          // className={({ isActive }) => (isActive ? "activeLink" : "navLink")}
          className={`justify-content-center justify-content-lg-start ${
            location.pathname === link.path ? "activeLink" : "navLink"
          } sidebarLinks`}
          to={link.path}
        >
          <span>
            {location.pathname === link.path ? link.activeIcon : link.icon}
          </span>
          <span className="d-none d-lg-block">{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Navlinks;
