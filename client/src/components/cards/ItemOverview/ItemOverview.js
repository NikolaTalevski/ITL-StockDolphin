import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ItemOverview.css";

const ItemOverview = () => {
  const [orders, setOrders] = useState([]);
  const itemId = useLocation().state.itemId;
  const itemName = useLocation().state.itemName;

  useEffect(() => {
    fetch("/api/v1/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.filter((o) => o.itemId === itemId));
      })
      .catch((err) => console.err);
  });

  return (
    <div>
      <header className="header">
        <h1>
          Inventory {">"} {itemName}
        </h1>
      </header>
      <hr className="hr-header" />
      <div className="order-overview">
        <p>Total Orders: </p>
        <p>Total Cost: </p>
        <p>Total Invoices: </p>
        <div>
          <button className="add-ord-btn">
            <img src={require("../../../images/addnew.png")} alt="addnew" />
            <span>ADD ORDER</span>
          </button>
        </div>
      </div>
      <div className="ord-inv">
        <h1>Orders</h1>
        <button className="add-inv-btn">
          <span>Generate Invoice</span>
        </button>
      </div>
      <hr className="hr" />

      {/* {orders.map((order) => (
        <h1>{order.supplier}</h1>
      ))} */}
      <h1>Hello</h1>
    </div>
  );
};

export default ItemOverview;
