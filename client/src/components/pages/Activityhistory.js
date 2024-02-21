import React from "react";
import "./Activityhistory.css";
import RecentActivityHistory from "../RecentActivity/RecentActivityHistory";

const Activityhistory = () => {
  return (
    <div>
      <header className="">
        <h1>Reports {" > "} Activity History</h1>
        <hr></hr>
      </header>
      <div className="reportsactivityhistory">
        <RecentActivityHistory />
      </div>
    </div>
  );
};

export default Activityhistory;
