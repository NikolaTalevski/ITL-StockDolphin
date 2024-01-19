import React from "react";
import "./Order-Card.css";

const OrderCard = () => {
  return (
    <div className="card">
      <div className="top">
        <img
          src={require("../../images/order-icon.png")}
          alt="order"
          className="order"
          width={30}
          height={30}
        />
      </div>
      <div className="middle">
        <p>
          <b>378</b>
        </p>
      </div>
      <div className="bottom">
        <p>Total Orders</p>
      </div>
    </div>
  );
};

export default OrderCard;
