import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./CategoryOverview.css";
import ModalDelete from "../../Modals/ModalDelete";
import ModalAddItem from "../../Modals/ModalAddItem";
import ModalEditCategory from "../../Modals/ModalEditCategory";
import ItemsList from "./ItemsList";

const CategoryOverview = () => {
  const [newItems, setNewItems] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const categoryId = useLocation().state.categoryId;

  const ItemAdded = (i) => {
    console.log(i);
    setNewItems(i);
  };

  const handleEditClick = () => {
    setOpenEditModal(true);
  };

  useEffect(() => {
    fetch(`/api/v1/category/${categoryId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((err) => console.err);
  }, []);

  const handleEditCategory = async (name) => {
    try {
      let reqBody = category;
      reqBody.name = name;
      const res = await fetch(`/api/v1/category/${category._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(reqBody),
      });
      if (!res.ok) {
        throw "Failed to edit category";
      }
      setCategory(reqBody);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1>
          Inventory {">"} {category.name}
        </h1>
        <hr />
      </div>
      <div className="add">
        <button className="add-btn" onClick={() => setOpenModal(true)}>
          <img src={require("../../../images/addnew.png")} alt="addnew" />
          <span>ADD ITEM</span>
        </button>
      </div>
      <ItemsList newItems={newItems} />
      <ModalAddItem
        open={openModal}
        categoryId={categoryId}
        onClose={() => setOpenModal(false)}
        onAdd={ItemAdded}
      />
      <div className="add">
        <button className="add-btn" onClick={() => handleEditClick()}>
          <img src={require("../../../images/editbtn.png")} alt="edit" />
          <span>Edit Category</span>
        </button>
      </div>
      <ModalEditCategory
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onUpdate={handleEditCategory}
        category={category}
      />
    </>
  );
};

export default CategoryOverview;
