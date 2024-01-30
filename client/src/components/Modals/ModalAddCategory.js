import React from "react";

const ModalAddCategory = (isOpen, onClose, onAction) => {
  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="content">
        <header>Add Category</header>
        <input placeholder="Name*" type="text" />
        <hr></hr>
        <button>(Add Photo, 2MB Total)</button>
        <hr></hr>
        <button onClick={onClose}>CANCEL</button>
        <button onClick={onAction}>ADD CATEGORY</button>
      </div>
    </div>
  );
};

export default ModalAddCategory;
