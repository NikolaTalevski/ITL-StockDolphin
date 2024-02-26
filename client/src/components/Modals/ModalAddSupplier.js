import React, { useState } from "react";

const ModalAddSupplier = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const AddSupplier = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/v1/supplier", {
        method: "POST",
        body: JSON.stringify({ name, address, phonenumber, email }),
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!res.ok) {
        throw "You aren't able to add a supplier";
      }
      let data = await res.json();
      console.log(data);
      onClose();
      onAdd(data);
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
          <h4>Add Supplier</h4>
          <p onClick={onClose}>X</p>
        </header>
        <input
          className="modal-container-input"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Phonenumber"
          type="number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={onClose}>
            CANCEL
          </button>
          <button className="modal-add-btn" onClick={AddSupplier}>
            ADD SUPPLIER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddSupplier;
