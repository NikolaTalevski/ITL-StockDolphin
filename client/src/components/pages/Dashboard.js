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
          <h3>Inventory summary</h3>
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
          <h3>Recent activity</h3>
          <div className="activities">
            <RecentActivity />
          </div>
        </div>
      </div>
      <div className="section-container">
        <div className="recent-orders section">
          <h3>Recent orders</h3>
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
