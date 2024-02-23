import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CategoryOverview = () => {
  const [items, setItems] = useState([]);
  const categoryId = useLocation().state.categoryId;

  useEffect(() => {
    fetch("/api/v1/item", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data.filter((i) => i.categoryId === categoryId));
      })
      .catch((err) => console.err);
  }, []);

  return (
    <div>
      <div>
        {items.map((item) => {
          console.log(item);
          return <p>{item.name}</p>;
        })}
      </div>
    </div>
  );
};

export default CategoryOverview;
