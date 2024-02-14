import React, { useEffect, useState } from "react";

const ModalEditSupplier = ({ open, onClose, onUpdate, supplier }) => {
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPhonenumber, setEditedPhonenumber] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  useEffect(() => {
    if (supplier) {
      setEditedName(supplier.name);
      setEditedAddress(supplier.address);
      setEditedPhonenumber(supplier.phonenumber);
      setEditedEmail(supplier.email);
    }
    // const fetchSupplier = async () => {
    //   try {
    //     const res = await fetch(`/api/v1/supplier/${id}`, {
    //       method: "GET",
    //       headers: {
    //         "content-type": "application/json",
    //         authorization: `bearer ${localStorage.getItem("jwt")}`,
    //       },
    //     });
    //     if (!res.ok) {
    //       throw new Error("Failed to fetch supplier");
    //     }
    //     const data = await res.json();
    //     setSupplier(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchSupplier();
  }, [supplier]);

  if (!open) return null;

  const handleUpdate = () => {
    onUpdate(editedName, editedAddress, editedPhonenumber, editedEmail);
    onClose();
  };

  // const EditSupplier = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch(`/api/v1/supplier/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "content-type": "application/json",
  //         authorization: `bearer ${localStorage.getItem("jwt")}`,
  //       },
  //       body: JSON.stringify(supplier),
  //     });
  //     if (!res.ok) {
  //       throw new Error(`Failed to update supplier: ${res.statusText} `);
  //     }
  //     onClose();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
          name="name"
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Address"
          name="address"
          type="text"
          value={editedAddress}
          onChange={(e) => setEditedAddress(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Phonenumber"
          name="phonenumber"
          type="number"
          value={editedPhonenumber}
          onChange={(e) => setEditedPhonenumber(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Email"
          name="email"
          type="email"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={onClose}>
            CANCEL
          </button>
          <button className="modal-add-btn" onClick={handleUpdate}>
            EDIT SUPPLIER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditSupplier;
