import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const CategoryCardList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/v1/category", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.err);
  }, []);

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div>
          {/* <NavLink to="/inventory/category" state={{ from: category._id }}>
            {" "}
            Link{" "}
          </NavLink> */}
          <NavLink
            to="/inventory/category"
            state={{ categoryId: category._id }}
          >
            <img alt="Category-Img" />
            <div>
              <p>{category.name}</p>
              <p>
                <b>{category.items.length} Items</b> | price
              </p>
              <p>{category.updatedAt}</p>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CategoryCardList;
