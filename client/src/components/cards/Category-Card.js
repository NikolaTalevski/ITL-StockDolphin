import React from "react";
import "./Category-Card.css";

const CategoryCard = () => {
  return (
    <div className="card">
      <div className="top">
        <img
          src={require("../../images/folder-icon.png")}
          alt="folder"
          className="folder"
          width={30}
          height={30}
        />
      </div>
      <div className="middle">
        <p>
          <b>13</b>
        </p>
      </div>
      <div className="bottom">
        <p>Categories</p>
      </div>
    </div>
  );
};

export default CategoryCard;
