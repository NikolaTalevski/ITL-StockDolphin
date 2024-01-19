import React from "react";
import CategoryCard from "../cards/Category-Card";
import ItemCard from "../cards/Item-Card";
import OrderCard from "../cards/Order-Card";
import CostCard from "../cards/Cost-Card";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <header className="header">
        <h1>Dashboard </h1>
        <hr></hr>
      </header>

      <div className="inventory-summary">
        <h4>Inventory summary</h4>
        <div className="cards">
          <CategoryCard />
          <ItemCard />
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
    </div>
  );
};

export default Dashboard;
