import React from "react";
import "./Item-Card.css";

const ItemCard = () => {
  return (
    <div className="card">
      <div className="top">
        <img
          src={require("../../images/item-icon.jpg")}
          alt="item"
          className="item"
          width={30}
          height={30}
        />
      </div>
      <div className="middle">
        <p>
          <b>123</b>
        </p>
      </div>
      <div className="bottom">
        <p>Items</p>
      </div>
    </div>
  );
};

export default ItemCard;
