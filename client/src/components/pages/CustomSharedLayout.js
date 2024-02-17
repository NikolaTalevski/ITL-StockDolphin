import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./CustomSharedLayout.css";

const CustomSharedLayout = () => {
  return (
    <div className="custom-shared-layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomSharedLayout;
