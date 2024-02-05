import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";

const TotalItemCard = () => {
  const imgItem = require("../../../images/item-icon.jpg");
  const [number, setNumber] = useState([0]);

  useEffect(() => {
    fetch("/api/v1/item", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((allItems) => {
        setNumber(allItems.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return <SummaryCard img={imgItem} description={"Items"} number={number} />;
};

export default TotalItemCard;
