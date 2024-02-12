import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";

const CostCard = () => {
  const imgCost = require("../../../images/cost-icon.png");
  const [totalCost, setTotalCost] = useState([0]);

  useEffect(() => {
    const fetchOrderTotalPrice = () => {
      fetch("/api/v1/order/total-price", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTotalCost(data.totalPrice);
        })

        .catch((err) => {
          console.log(err);
        });
    };
    fetchOrderTotalPrice();
  }, []);

  return (
    <SummaryCard img={imgCost} description={"Total Cost"} number={totalCost} />
  );
};

export default CostCard;
