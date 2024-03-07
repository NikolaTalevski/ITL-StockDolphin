import React, { useEffect, useState } from "react";

const ModalMoveItem = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const closeModal = () => {
    setCategoryId(props.categoryId);
    props.onClose();
  };

  useEffect(() => {
    setCategoryId(props.categoryId);
  }, [props.categoryId]);

  useEffect(() => {
    fetch(`/api/v1/category`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.err);
  }, []);

  if (!props.open) return null;

  return (
    <div onClick={() => closeModal()} className="overlay">
      <div onClick={(e) => e.stopPropagation()} className="modal-container">
        <header className="modal-container-header">
          <h4>Move Item</h4>
          <p onClick={() => closeModal()}>X</p>
        </header>
        <h8>Select category:</h8>
        <select
          className="ordersDropdown"
          name="ordersDropdown"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((category) => {
            if (category._id === categoryId) {
              return (
                <option value={category._id} selected>
                  {category.name}
                </option>
              );
            } else {
              return <option value={category._id}>{category.name}</option>;
            }
          })}
        </select>
        <div className="modal-bottom">
          <button
            className="modal-add-btn"
            onClick={() => {
              props.onClose();
              props.onMoveItem(categoryId);
            }}
          >
            Move Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMoveItem;
