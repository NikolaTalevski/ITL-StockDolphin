import React from "react";
import SummaryCard from "./SummaryCard";

const CategoryCard = () => {
  const imgCategory = require("../../../images/folder-icon.png");
  return (
    <SummaryCard img={imgCategory} description={"Category"} number={"13"} />
  );
};

export default CategoryCard;
