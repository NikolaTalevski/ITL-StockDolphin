import React from "react";
import "./ItemCard.css";

const ItemCard = ({ img, title, items, price }) => {
  return (
    <div class="item-card">
      <img src={img} alt="Order-Img" />

      <div class="item-card-bottom">
        <p class="item-card-bottom-title">{title}</p>
        <p class="item-card-bottom-description">
          <b>{items} | </b>
          {price}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
