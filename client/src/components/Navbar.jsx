import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import { userSvg } from "../constants/svgs";
import { useLocation } from "react-router-dom";
import ActionBar from "./ActionBar";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const userRef = useRef(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const detectClick = (e) => {
      if (useRef && userRef.current) {
        if (userRef.current.contains(e.target)) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }
    };

    document.addEventListener("click", detectClick);

    return () => window.removeEventListener("click", detectClick);
  }, []);

  return (
    <div className="d-flex w-100 d-flex justify-content-between align-items-center p-2 topSearchbar">
      {location.pathname === "/stream" && (
        <div className="d-none d-lg-block">
          <ActionBar />
        </div>
      )}
      <div className="w-50">
        <SearchBar />
      </div>
      <div className="d-flex justify-content-end">
        <div
          className="d-flex align-items-center gap-2 position-relative cursor-pointer"
          onClick={() => setOpen(!open)}
          ref={userRef}
        >
          <h6 className="text-white">John Doe</h6>
          {userSvg}
          {open && <UserMenu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
