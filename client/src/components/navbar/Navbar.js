import React from "react";
import "./Navbar.css";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";
import Suppliers from "../pages/Suppliers";
import Login from "../login/Login";
import Activityhistory from "../pages/Activityhistory";
import Inventorysummary from "../pages/Inventorysummary";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <section className="grid-container">
      <nav className="sidebar">
        <div className="grid-img">
          <img
            className="logo"
            src={require("../../images/logo1.png")}
            alt="logo"
          />
        </div>
        <div className="grid">
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
        <div className="grid">
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
        <div className="grid">
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
        <div className="grid">
          <NavLink className="navlink" to="/suppliers">
            Suppliers
          </NavLink>
        </div>
        <div className="signin">
          <img
            src={require("../../images/power.png")}
            alt="power"
            width={40}
            height={40}
          />
          <NavLink className="navlink" to="/login">
            Sign In
          </NavLink>
        </div>
      </nav>
      <div className="content">
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
        </Routes>
      </div>
    </section>
  );
};

export default Navbar;
