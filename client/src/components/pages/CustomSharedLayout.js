import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const CustomSharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default CustomSharedLayout;
