import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./CustomSharedLayout.css";

const CustomSharedLayout = () => {
  return (
    <div className="custom-shared-layout">
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomSharedLayout;
