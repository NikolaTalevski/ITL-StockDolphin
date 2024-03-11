import React from "react";
import "./Activityhistory.css";
import RecentActivityHistory from "../RecentActivity/RecentActivityHistory";

const Activityhistory = () => {
  return (
    <div className="activity-history-container">
      <header className="header">
        <h1>Reports {" > "} Activity History</h1>
      </header>
      <hr />
      <div className="reportsactivityhistory">
        <RecentActivityHistory />
      </div>
    </div>
  );
};

export default Activityhistory;
