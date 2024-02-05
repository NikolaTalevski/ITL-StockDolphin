import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";

const CostCard = () => {
  const imgCost = require("../../../images/cost-icon.png");
  const [order, setOrder] = useState("");

  useEffect(() => {
    const fetchOrder = () => {
      fetch("/api/v1/order", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((orderData) => {
          setOrder(orderData);
        })

        .catch((err) => {
          console.log(err);
        });
    };
    fetchOrder();
  }, []);

  return (
    <SummaryCard
      img={imgCost}
      description={"Total Cost"}
      number={order.price}
    />
  );
};

export default CostCard;
