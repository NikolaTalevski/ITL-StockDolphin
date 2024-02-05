import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";

const CategoryCard = () => {
  const imgCategory = require("../../../images/folder-icon.png");
  const [number, setNumber] = useState([0]);

  useEffect(() => {
    fetch("/api/v1/category", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((allCategories) => {
        setNumber(allCategories.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <SummaryCard img={imgCategory} description={"Category"} number={number} />
  );
};

export default CategoryCard;
