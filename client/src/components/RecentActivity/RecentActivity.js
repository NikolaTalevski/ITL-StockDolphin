import React, { useEffect, useState } from "react";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/v1/recent-activity", {
          method: "GET",
        });
        setActivities(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(fetchActivity, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h4>RecentActivity</h4>
      {activities &&
        activities.map((activity, index) => {
          <p key={index}>{activity.message}</p>;
        })}
    </div>
  );
};

export default RecentActivity;
