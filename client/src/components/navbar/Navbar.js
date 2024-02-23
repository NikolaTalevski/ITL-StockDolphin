import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
// import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
// import Inventory from "../pages/Inventory";
// import Reports from "../pages/Reports";
// import Suppliers from "../pages/Suppliers";
// import Login from "../login/Login";
// import Activityhistory from "../pages/Activityhistory";
// import Inventorysummary from "../pages/Inventorysummary";
// import Register from "../register/Register";
// import SuppliersModal from "../pages/SuppliersModal";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt") ? true : false
  );
  const handleSignIn = () => {
    localStorage.getItem("jwt");
    localStorage.getItem("username");
    setIsLoggedIn(true);
  };
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };
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
          <NavLink className="navlink">
            {isLoggedIn ? (
              <NavLink className="navlink" onClick={handleSignOut} to="/login">
                Sign Out
              </NavLink>
            ) : (
              <NavLink className="navlink" onClick={handleSignIn} to="/login">
                Sign In
              </NavLink>
            )}
          </NavLink>
        </div>
      </div>

      {/* <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route
            path="/reports/activityhistory"
            element={<Activityhistory />}
          />
          <Route
            path="/reports/inventorysummary"
            element={<Inventorysummary />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/suppliers/modal" element={<SuppliersModal />} />
        </Routes>
      </div> */}
    </section>
  );
};

export default Navbar;
