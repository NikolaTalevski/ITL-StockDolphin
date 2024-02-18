import React, { useEffect, useState } from "react";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/v1/recent-activity", {
          method: "GET",
        });
        const data = res.json();
        setActivities(data);
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

  return (
    <div>
      <h4>RecentActivity</h4>
      <ul>
        {activities.map((activity, index) => {
          return (
            <li key={index}>
              <b>{activity.username}</b> {activity.action}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivity;
