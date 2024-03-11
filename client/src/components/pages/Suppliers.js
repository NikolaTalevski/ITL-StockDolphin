import React, { useState } from "react";
import "./Suppliers.css";
import ModalAddSupplier from "../Modals/ModalAddSupplier";
import SupplierList from "../cards/SupplierCard/SupplierList";

const Suppliers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newSupplies, setNewSupplies] = useState(null);

  const SupplierAdded = (s) => {
    console.log(s);
    setNewSupplies(s);
  };
  return (
    <div className="suppliers-container">
      <header className="header">
        <h1>Suppliers </h1>
      </header>
      <hr />
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

      <div className="supplier-cards">
        <SupplierList newSupplies={newSupplies} />
      </div>
      <ModalAddSupplier
        onAdd={SupplierAdded}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Suppliers;
