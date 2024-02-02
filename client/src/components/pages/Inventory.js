import React, { useState } from "react";
import "./Inventorysummary.css";
import "../AddButton/AddButton.css";
import ModalAddCategory from "../Modals/ModalAddCategory";

const Inventory = () => {
  const [openModal, setOpenModal] = useState(false);
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
            name="categories"
            placeholder="Search Categories"
            className="search-input"
          />
        </div>

        <div className="add">
          <button className="add-btn" onClick={() => setOpenModal(true)}>
            <img src={require("../../images/addnew.png")} alt="addnew" />
            <span>ADD CATEGORY</span>
          </button>
        </div>
      </div>
      <ModalAddCategory open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Inventory;
