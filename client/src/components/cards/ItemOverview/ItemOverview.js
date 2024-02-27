import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ItemOverview = () => {
  const [orders, setOrders] = useState([]);
  const itemId = useLocation().state.itemId;

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
      {/* {orders.map((order) => (
        <h1>{order.supplier}</h1>
      ))} */}
      <h1>Hello</h1>
    </div>
  );
};

export default ItemOverview;
