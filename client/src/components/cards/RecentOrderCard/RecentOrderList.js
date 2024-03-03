import React, { useEffect, useState } from "react";
import "./RecentOrderList.css";

const RecentOrdersList = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const noimg = require("../../../images/no-img.png");

  useEffect(() => {
    fetch("/api/v1/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRecentOrders(data))
      .catch((err) => console.err);
  }, []);

  return (
    <div className="recentordercard-container">
      {recentOrders.map((recentOrder) => (
        <div key={recentOrder._id} className="recentordercard">
          <img src={noimg} alt="Order-Img" className="recentordercard-img" />

          <div className="recentordercard-bottom">
            <p className="recentordercard-title">{recentOrder.itemName}</p>
            <p className="recentordercard-description">
              <b>{recentOrder.quantity} Units | </b>$ {recentOrder.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrdersList;
