import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

const ModalAddOrder = ({ open, onClose, onAdd, item, suppliers }) => {
  // const [supplier, setSupplier] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [price, setPrice] = useState("");
  // const itemID = useLocation().state.itemId;
  // const itemName = useLocation().state.itemName;
  const [newOrder, setNewOrder] = useState({});

  if (!open) return null;

  const AddOrder = async (e) => {
    e.preventDefault();

    try {
      const newOrderUpdate = newOrder;
      newOrderUpdate.itemID = item._id;
      newOrderUpdate.itemName = item.name;
      let res = await fetch("/api/v1/order", {
        method: "POST",
        body: JSON.stringify(newOrderUpdate),
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!res.ok) {
        throw "You aren't able to add a order";
      }
      let data = await res.json();
      setNewOrder({});
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
        {/* <input
          className="modal-container-input"
          placeholder="itemId"
          type="text"
          value={item._id}
        />
        <input
          className="modal-container-input"
          placeholder="itemName"
          type="text"
          value={item.name}
        /> */}
        <div className="ordersDropdownContainer">
          <select
            className="ordersDropdown"
            name="ordersDropdown"
            onChange={(e) => {
              const updatedNewOrder = { ...newOrder };
              updatedNewOrder.supplier = e.target.value;
              setNewOrder(updatedNewOrder);
            }}
          >
            <option value="">Select supplier</option>
            {suppliers.map((s) => {
              return <option value={s.name}>{s.name}</option>;
            })}
          </select>
        </div>
        {/* <input
          className="modal-container-input"
          placeholder="Supplier"
          type="text"
          value={newOrder.supplier}
          onChange={(e) => {
            const updatedNewOrder = { ...newOrder };
            updatedNewOrder.supplier = e.target.value;
            setNewOrder(updatedNewOrder);
          }}
        /> */}
        <input
          className="modal-container-input"
          placeholder="Quantity"
          type="text"
          value={newOrder.quantity}
          onChange={(e) => {
            const updatedNewOrder = { ...newOrder };
            updatedNewOrder.quantity = e.target.value;
            setNewOrder(updatedNewOrder);
          }}
        />
        <input
          className="modal-container-input"
          placeholder="Total Price"
          type="number"
          value={newOrder.price}
          onChange={(e) => {
            const updatedNewOrder = { ...newOrder };
            updatedNewOrder.price = e.target.value;
            setNewOrder(updatedNewOrder);
          }}
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
