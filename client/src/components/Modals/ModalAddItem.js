import React, { useState } from "react";

const ModalAddItem = ({ open, categoryId, onClose, onAdd }) => {
  const [name, setName] = useState("");

  if (!open) return null;

  const AddItem = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/v1/item", {
        method: "POST",
        body: JSON.stringify({ name, categoryId }),
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!res.ok) {
        throw "You aren't able to add an item";
      }
      let data = await res.json();
      console.log(data);
      onClose();
      onAdd(data);
      setName("");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      onClick={() => {
        setName("");
        onClose();
      }}
      className="overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <header className="modal-container-header">
          <h4>Add Item</h4>
          <p
            onClick={() => {
              setName("");
              onClose();
            }}
          >
            X
          </p>
        </header>
        <input
          className="modal-container-input"
          placeholder="Name*"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <hr></hr>
        <button className="modal-container-btn">(Add Photo, 2MB Total)</button>
        <hr></hr>
        <div className="modal-bottom">
          <button
            className="modal-close-btn"
            onClick={() => {
              setName("");
              onClose();
            }}
          >
            CANCEL
          </button>
          <button className="modal-add-btn" onClick={AddItem}>
            ADD ITEM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddItem;
