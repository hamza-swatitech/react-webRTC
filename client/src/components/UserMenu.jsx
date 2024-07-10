import React from "react";
import { activeUserSvg } from "../constants/svgs";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import LanguageChip from "./LanguageChip";
const UserMenu = () => {
  const lists = [
    {
      label: "my profile",
      icon: null,
    },
    {
      label: "my subscription",
      icon: <ChevronRight />,
    },
    {
      label: "language",
      icon: <LanguageChip />,
    },
    {
      label: "account settings",
      icon: null,
    },
    {
      label: "sign out",
      icon: null,
    },
  ];
  return (
    <div className="position-absolute userMenuWrapper d-flex flex-column ">
      <div className="d-flex gap-3 align-items-center">
        <div>{activeUserSvg}</div>
        <div className="d-flex flex-column">
          <h5 className=" m-0 p-0 text-white fs-6">John Doe</h5>
          <p className="text-secondary m-0 p-0 text-xs">Admin</p>
        </div>
      </div>
      <hr />

      <div className="d-flex flex-column">
        {lists.map((list, index) => (
          <NavLink
            className=" navLink text-capitalize justify-content-between"
            key={index}
          >
            <label>{list.label}</label>
            {list.icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
