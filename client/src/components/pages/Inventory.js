import React from "react";
import AddButton from "../AddButton/AddButton";

const Inventory = () => {
  return (
    <div>
      <header className="header">
        <h1>Inventory </h1>
        <hr></hr>
      </header>
      <div className="top-btn">
        <div className="search">
          <img src={require("../../images/search.png")} alt="search" />
          <input
            type="text"
            placeholder="Search Categories"
            className="search-input"
          />
        </div>
        <div>
          <AddButton model={"CATEGORY"} />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
