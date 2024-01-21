import React from "react";
import SummaryCard from "./SummaryCard";

const TotalItemCard = () => {
  const imgItem = require("../../../images/item-icon.jpg");
  return <SummaryCard img={imgItem} description={"Items"} number={"123"} />;
};

export default TotalItemCard;
