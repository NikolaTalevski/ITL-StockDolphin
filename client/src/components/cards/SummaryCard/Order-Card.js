import React from "react";
import SummaryCard from "./SummaryCard";

const OrderCard = () => {
  const imgOrder = require("../../../images/order-icon.png");
  return (
    <SummaryCard img={imgOrder} description={"Total Orders"} number={"378"} />
  );
};

export default OrderCard;
