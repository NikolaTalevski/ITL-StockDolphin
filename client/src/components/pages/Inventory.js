import React, { useState } from "react";
import AddButton from "../AddButton/AddButton";
import ModalAddCategory from "../Modals/ModalAddCategory";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const someAction = () => {
    console.log("Modal action");
  };

  return (
    <div>
      <header className="header">
        <h1>Inventory </h1>
        <hr></hr>
      </header>
      <div className="top-btn">
        <div className="search">
          <img src={require("../../images/search.png")} alt="search" />
          <input
            type="text"
            placeholder="Search Categories"
            className="search-input"
          />
        </div>
        <div>
          <AddButton model={"CATEGORY"} onClick={openModal} />
        </div>
      </div>
      <ModalAddCategory
        isOpen={isModalOpen}
        onClose={closeModal}
        onAction={someAction}
      />
    </div>
  );
};

export default Inventory;
