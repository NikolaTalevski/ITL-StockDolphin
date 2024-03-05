import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ModalAddOrder = ({ open, onClose, onAdd }) => {
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const itemID = useLocation().state.itemId;
  const itemName = useLocation().state.itemName;

  if (!open) return null;

  const AddOrder = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/v1/order", {
        method: "POST",
        body: JSON.stringify({ itemID, itemName, supplier, quantity, price }),
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!res.ok) {
        throw "You aren't able to add a order";
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
          <h4>Add Order</h4>
          <p onClick={onClose}>X</p>
        </header>
        <input
          className="modal-container-input"
          placeholder="itemId"
          type="text"
          value={itemID}
          //   onChange={(e) => setSupplier(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="itemName"
          type="text"
          value={itemName}
          //   onChange={(e) => setSupplier(e.target.value)}
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
          placeholder="Quantity"
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          className="modal-container-input"
          placeholder="Total Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={onClose}>
            CANCEL
          </button>
          <button className="modal-add-btn" onClick={AddOrder}>
            ADD ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddOrder;
