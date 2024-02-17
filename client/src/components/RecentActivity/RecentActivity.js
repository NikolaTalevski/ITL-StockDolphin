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

    fetchActivity();
    const intervalId = setInterval(fetchActivity, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h4>RecentActivity</h4>
      <ul>
        {activities.map((activity, index) => {
          <li key={index}>{activity}</li>;
        })}
      </ul>
    </div>
  );
};

export default RecentActivity;
