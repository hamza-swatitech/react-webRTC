import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <main className="mainWrapper p-2 d-flex flex-row">
      <Sidebar />
      <div className="d-flex flex-column  mainContent px-2">
        <Navbar />
        <div className="shadow  w-100 routes rounded p-2 mainScreenLy">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
