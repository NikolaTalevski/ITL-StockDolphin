import React from "react";
import "./Suppliers.css";
import AddButton from "../AddButton/AddButton";
import { Link } from "react-router-dom";

const Suppliers = () => {
  return (
    <div>
      <header className="header">
        <h1>Suppliers </h1>
        <hr></hr>
      </header>
      <div className="top-btn">
        <div className="search">
          <img src={require("../../images/search.png")} alt="search" />
          <input
            type="text"
            placeholder="Search Suppliers"
            className="search-input"
          />
        </div>
        <div>
          <Link to="/suppliers/modal">
            <AddButton model={"SUPPLIER"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
