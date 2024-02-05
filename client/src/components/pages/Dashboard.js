import React, { useEffect, useState } from "react";
import CategoryCard from "../cards/SummaryCard/Category-Card";
import TotalItemCard from "../cards/SummaryCard/Total-Item-Card";
import OrderCard from "../cards/SummaryCard/Order-Card";
import CostCard from "../cards/SummaryCard/Cost-Card";
import "./Dashboard.css";
import ItemCard from "../cards/RecentOrderCard/ItemCard";

const Dashboard = () => {
  const mouse = require("../../images/mouse.png");
  const a4paper = require("../../images/a4paper.png");
  const espresso = require("../../images/espresso.png");
  const pens = require("../../images/pens.png");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Dashboard </h1>
        <h2>Welcome back {username}</h2>
      </header>
      <hr></hr>

      <div className="inventory-summary">
        <h4>Inventory summary</h4>
        <div className="cards">
          <CategoryCard />
          <TotalItemCard />
          <OrderCard />
          <CostCard />
        </div>
      </div>
      <div className="recent-activity">
        <h4>Recent activity</h4>
        <div className="activites">
          <p className="paragraph">
            Admin has created item <b>Office Pens </b>in
            <b> Office Supply (Office Category)</b>
          </p>
          <p className="paragraph">
            Admin has created item <b>A4 Paper </b>in
            <b> Office Supply (Office Category)</b>
          </p>
          <p className="paragraph-g">
            Admin has deleted item <b>Espresso </b>in
            <b> Kitchen Supply (Kitchen Category)</b>
          </p>
          <p className="paragraph">
            Admin has moved item <b>Mouse </b>in
            <b> Office Supply (Office Category)</b>
          </p>
        </div>
      </div>
      <div className="recent-orders">
        <h4>Recent orders</h4>
        <div className="recent-orders-cards">
          <ItemCard
            img={mouse}
            title={"Office Mouse"}
            items={"7 Units"}
            price={"$133.00"}
          />
          <ItemCard
            img={a4paper}
            title={"A4 Paper"}
            items={"917 Unit"}
            price={"$28.00"}
          />
          <ItemCard
            img={espresso}
            title={"Espresso"}
            items={"3 Unit"}
            price={"$22.00"}
          />
          <ItemCard
            img={pens}
            title={"Office Pens"}
            items={"66 Unit"}
            price={"$17.00"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
