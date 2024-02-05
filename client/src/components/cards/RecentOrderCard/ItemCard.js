import React from "react";
import "./ItemCard.css";

const ItemCard = ({ img, title, items, price }) => {
  return (
    <div className="item-card">
      <img src={img} alt="Order-Img" />

      <div className="item-card-bottom">
        <p className="item-card-bottom-title">{title}</p>
        <p className="item-card-bottom-description">
          <b>{items} | </b>
          {price}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
