import React, { useEffect, useState } from "react";

const ModalEditSupplier = ({ open, onClose, supplier, onUpdate }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  //   console.log(supplier);

  useEffect(() => {
    if (supplier && supplier._id) {
      setName(supplier.name || "");
      setAddress(supplier.address || "");
      setPhonenumber(supplier.phonenumber || "");
      setEmail(supplier.email || "");
    }
  }, [supplier]);

  if (!open) return null;

  const EditSupplier = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/v1/supplier/${supplier._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ name, address, phonenumber, email }),
      });
      if (!res.ok) {
        throw "Failed";
      }
      const updatedSupplier = await res.json();
      onUpdate(updatedSupplier);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <header className="modal-container-header">
          <h4>Edit Supplier</h4>
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
          <button className="modal-add-btn" onClick={EditSupplier}>
            EDIT SUPPLIER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditSupplier;
