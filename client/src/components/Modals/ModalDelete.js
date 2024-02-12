import React from "react";
import "./ModalDelete.css";

const ModalDelete = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <p className="modal-container-header">Delete modal</p>
        <button className="modal-close-btn" onClick={onClose}>
          close
        </button>
        <button className="modal-add-btn">Delete</button>
      </div>
    </div>
  );
};

export default ModalDelete;
