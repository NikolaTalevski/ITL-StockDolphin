import React from "react";
import "./Reports.css";
import { Link } from "react-router-dom";

const Reports = () => {
  return (
    <div>
      <header className="">
        <h1>Reports </h1>
        <hr></hr>
      </header>
      <div className="reports">
        <div className="activityhistory">
          <img
            src={require("../../images/timemachine.png")}
            alt="timemachine"
            width={50}
            height={50}
          />
          <Link className="activitylink" to="/reports/activityhistory">
            Activity History
          </Link>
        </div>
        <div>
          <p>
            Activity history helps keep track of the things you do with your
            items, categories, tags, etc., such as creating, editing or deleting
          </p>
          <hr></hr>
        </div>
        <div className="inventorysummary">
          <img
            src={require("../../images/inventory.png")}
            alt="inventory"
            width={50}
            height={50}
          />
          <Link className="inventorysummarylink" to="/reports/inventorysummary">
            Inventory Summary
          </Link>
        </div>
        <div>
          <p>
            Inventory Summary provides detailed visualizations about the total
            cost of the categories over a period of time.
          </p>
          <hr></hr>
        </div>
      </div>
    </div>
  );
};

export default Reports;
