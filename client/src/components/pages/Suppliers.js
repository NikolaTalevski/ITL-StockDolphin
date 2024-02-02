import React, { useState } from "react";
import "./Suppliers.css";
import ModalAddSupplier from "../Modals/ModalAddSupplier";

const Suppliers = () => {
  const [openModal, setOpenModal] = useState(false);
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
        <div className="add">
          <button className="add-btn" onClick={() => setOpenModal(true)}>
            <img src={require("../../images/addnew.png")} alt="addnew" />
            <span>ADD SUPPLIER</span>
          </button>
        </div>
      </div>
      <ModalAddSupplier open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Suppliers;
