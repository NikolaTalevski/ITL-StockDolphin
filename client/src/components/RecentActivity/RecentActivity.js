import React, { useEffect, useState } from "react";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/v1/recent-activity", {
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

  return activities.map((activity, index) => {
    return (
      <>
        <p key={index} className="activity">
          <b>{activity.username}</b> has {activity.action} {activity.entityType}{" "}
          <b>{activity.entityName}</b> {activity.category ? "in" : ""}{" "}
          <b>
            {activity.category} {activity.category ? "(Category)" : ""}
          </b>
        </p>
      </>
    );
  });
};

export default RecentActivity;
