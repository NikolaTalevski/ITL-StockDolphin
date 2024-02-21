import React, { useEffect, useState } from "react";

const RecentActivityHistory = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/v1/recent-activity/history", {
          method: "GET",
        });
        const data = await res.json();
        setActivities(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchActivity();
    const intervalId = setInterval(fetchActivity, 1000000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return activities
    .slice(0, Math.min(10, activities.length))
    .map((activity, index1) => {
      return (
        <div className="activityh">
          <p key={index1}>
            <b>{activity.username}</b> has {activity.action}{" "}
            {activity.entityType} <b>{activity.entityName}</b>{" "}
            {activity.category ? "in" : ""}{" "}
            <b>
              {activity.category} {activity.category ? "(Category)" : ""}
            </b>
          </p>
          <p>{activity.createdAt}</p>
        </div>
      );
    });
};

export default RecentActivityHistory;
