import React, { useEffect, useState } from "react";
import CategoryCard from "../cards/SummaryCard/Category-Card";
import TotalItemCard from "../cards/SummaryCard/Total-Item-Card";
import OrderCard from "../cards/SummaryCard/Order-Card";
import CostCard from "../cards/SummaryCard/Cost-Card";
import "./Dashboard.css";
import RecentActivity from "../RecentActivity/RecentActivity";
import RecentOrdersList from "../cards/RecentOrderCard/RecentOrderList";

const Dashboard = () => {
  // const mouse = require("../../images/mouse.png");
  // const a4paper = require("../../images/a4paper.png");
  // const espresso = require("../../images/espresso.png");
  // const pens = require("../../images/pens.png");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Dashboard </h1>
        <h2>Welcome back {username}</h2>
      </header>
      <hr />

      <div className="section-container">
        <div className="inventory-summary section">
          <h4>Inventory summary</h4>
          <div className="cards">
            <CategoryCard />
            <TotalItemCard />
            <OrderCard />
            <CostCard />
          </div>
        </div>
      </div>
      <div className="section-container">
        <div className="recent-activity section">
          <h4>Recent activity</h4>
          <div className="activities">
            <RecentActivity />
          </div>
          {/* <h4>Recent activity</h4>
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
        </div> */}
        </div>
      </div>
      <div className="section-container">
        <div className="recent-orders section">
          <h4>Recent orders</h4>
          <div className="cards">
            {/* <ItemCard
            img={mouse}
            title={"Office Mouse"}
            items={"7 Units"}
            price={"$133.00"}
          /> */}
            <RecentOrdersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
