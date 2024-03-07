import React, { useState } from "react";
import "./ModalAddInvoice.css";

const ModalAddInvoice = (props) => {
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [orders, setOrders] = useState(props.orders);
  const [invoice, setInvoice] = useState({
    name: "",
    supplier: "",
    orders: [],
  });

  if (!props.open) return null;

  const AddInvoice = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/v1/invoice", {
        method: "POST",
        body: JSON.stringify(invoice),
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
      props.onInvoiceAdded();
      props.onClose();
      //   onAdd(data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div onClick={props.onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <header className="modal-container-header">
          <h4>Add Invoice</h4>
          <p onClick={props.onClose}>X</p>
        </header>
        <input
          className="modal-container-input"
          placeholder="Invoice Name"
          type="text"
          value={invoice.name}
          onChange={(e) => {
            const updatedInvoice = { ...invoice };
            updatedInvoice.name = e.target.value;
            setInvoice(updatedInvoice);
          }}
        />
        <input
          className="modal-container-input"
          placeholder="Supplier"
          type="text"
          value={invoice.supplier}
          onChange={(e) => {
            const updatedInvoice = { ...invoice };
            updatedInvoice.supplier = e.target.value;
            setInvoice(updatedInvoice);
          }}
        />
        <div className="ordersDropdownContainer">
          <select
            className="ordersDropdown"
            name="ordersDropdown"
            onChange={(e) => {
              const updatedInvoice = { ...invoice };
              updatedInvoice.orders = [e.target.value];
              setInvoice(updatedInvoice);
            }}
          >
            <option value="">Select order</option>
            {props.orders.map((order) => {
              return (
                <option value={order._id}>
                  {order.supplier} - ${order.price} for {order.quantity} units
                </option>
              );
            })}
          </select>
        </div>
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={props.onClose}>
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
