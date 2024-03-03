import React, { useState } from "react";

const ModalAddInvoice = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [orders, setOrders] = useState("");

  if (!open) return null;

  const AddInvoice = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/v1/invoice", {
        method: "POST",
        body: JSON.stringify({ name, supplier, orders }),
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!res.ok) {
        throw "You aren't able to add a invoice";
      }
      let data = await res.json();
      console.log(data);
      onClose();
      //   onAdd(data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <header className="modal-container-header">
          <h4>Add Invoice</h4>
          <p onClick={onClose}>X</p>
        </header>
        <input
          className="modal-container-input"
          placeholder="Invoice Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Supplier"
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Select Orders"
          type="array"
          value={orders}
          onChange={(e) => setOrders(e.target.value)}
        />
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={onClose}>
            CANCEL
          </button>
          <button className="modal-add-btn" onClick={AddInvoice}>
            Add Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddInvoice;
