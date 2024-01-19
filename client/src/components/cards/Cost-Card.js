import React from "react";
import "./Cost-Card.css";

const CostCard = () => {
  return (
    <div className="card">
      <div className="top">
        <img
          src={require("../../images/cost-icon.png")}
          alt="cost"
          className="cost"
          width={30}
          height={30}
        />
      </div>
      <div className="middle">
        <p>
          <b>$1.250k</b>
        </p>
      </div>
      <div className="bottom">
        <p>Total Cost</p>
      </div>
    </div>
  );
};

export default CostCard;
