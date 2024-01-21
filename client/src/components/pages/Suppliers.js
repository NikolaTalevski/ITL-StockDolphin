import React from "react";
import "./Suppliers.css";
import AddButton from "../AddButton/AddButton";

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
          <AddButton model={"SUPPLIER"} />
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
