import React, { useState } from "react";
import SummaryCard from "./SummaryCard";

const CategoryCard = () => {
  const imgCategory = require("../../../images/folder-icon.png");
  const [number, setNumber] = useState("");

  const numberCat = async () => {
    try {
      let res = await fetch("/api/v1/category", {
        method: "GET",

        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });

      let data = await res.json();
      setNumber(data.length);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <SummaryCard
      img={imgCategory}
      description={"Category"}
      number={numberCat}
    />
  );
};

export default CategoryCard;
