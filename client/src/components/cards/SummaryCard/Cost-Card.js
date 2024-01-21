import React from "react";
import SummaryCard from "./SummaryCard";

const CostCard = () => {
  const imgCost = require("../../../images/cost-icon.png");
  return (
    <SummaryCard img={imgCost} description={"Total Cost"} number={"$1250k"} />
  );
};

export default CostCard;
