import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const signInText = () =>
    localStorage.getItem("username") ? "Sign out" : "Sing in";
  const [loginText, setLoginText] = useState(signInText);

  useEffect(() => {
    window.addEventListener("signinChange", () => {
      setLoginText(signInText);
    });
  });

  return (
    <section className="nav-bar-container">
      <nav className="nav-bar-menu-buttons-container">
        <img
          className="logo"
          src={require("../../images/logo1.png")}
          alt="logo"
        />

        <div className="nav-bar-button">
          <img
            src={require("../../images/dashboard.png")}
            alt="dashboard"
            width={40}
            height={40}
          />
          <NavLink
            className="navlink"
            // className={({ isActive }) => (isActive ? "link active" : "link")}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </div>
        <div className="nav-bar-button">
          <img
            src={require("../../images/inventory.png")}
            alt="inventory"
            width={40}
            height={40}
          />
          <NavLink className="navlink" to="/inventory">
            Inventory
          </NavLink>
        </div>
        <div className="nav-bar-button">
          <img
            src={require("../../images/reports.png")}
            alt="reports"
            width={40}
            height={40}
          />
          <NavLink className="navlink" to="/reports">
            Reports
          </NavLink>
        </div>
        <div className="nav-bar-button">
          <NavLink className="navlink" to="/suppliers">
            Suppliers
          </NavLink>
        </div>
      </nav>
      <div className="nav-bar-sign-button-container">
        <div className="nav-bar-button">
          <img
            src={require("../../images/power.png")}
            alt="power"
            width={40}
            height={40}
          />
          <NavLink className="navlink" to="/login">
            {loginText}
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
