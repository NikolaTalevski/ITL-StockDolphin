import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CategoryCard.css";
import ModalDelete from "../../Modals/ModalDelete";

const CategoryCardList = (props) => {
  const [categories, setCategories] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (props.newCategories !== null)
      setCategories([...categories, props.newCategories]);
  }, [props.newCategories]);

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

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setOpenDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await fetch(`/api/v1/category/${selectedCategoryId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!res.ok) {
        throw "Failed to delete category";
      }
      setCategories(
        categories.filter((category) => category._id !== selectedCategoryId)
      );
      setOpenDeleteModal(false);
      props.onCategoryDeleted();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div key={category._id} className="category-card">
          <NavLink
            className="navlink-category"
            to="/inventory/category"
            state={{ categoryId: category._id, categoryName: category.name }}
          >
            <img alt="Category-Img" />
            <div>
              <h4>{category.name}</h4>
              <p>
                <b>{category.items.length} Items</b> | {"$"} {""}{" "}
                {category.items.reduce((totalPrice, currentItem) => {
                  return (
                    totalPrice +
                    currentItem.orders.reduce((previousPrice, currentOrder) => {
                      return previousPrice + Number(currentOrder.price);
                    }, 0)
                  );
                }, 0)}
              </p>
            </div>
          </NavLink>
          <p>Updated At:</p>
          <div className="upddelbtn">
            <p className="upd">{category.updatedAt}</p>
            <button
              onClick={() => handleDeleteClick(category._id)}
              className="delbtn"
            >
              <img
                className="deletebtn"
                src={require("../../../images/deletebtn.png")}
                alt="deletebtn"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      ))}
      <ModalDelete
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteCategory}
        text={"Are you sure you want to delete this category?"}
      />
    </div>
  );
};

export default CategoryCardList;
