import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({ img, number, description }) => {
  return (
    <div className="card">
      <div className="top">
        <img
          src={img}
          alt={description}
          className="cardImg"
          width={30}
          height={30}
        />
      </div>
      <div className="middle">
        <p>
          <b>{number}</b>
        </p>
      </div>
      <div className="bottom">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
