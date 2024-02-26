import React from "react";
import "./ModalDelete.css";

const ModalDelete = ({ open, onClose, onDelete, text }) => {
  if (!open) return null;

  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <p className="modal-container-header">{text}</p>
        <button className="modal-close-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="modal-add-btn" onClick={handleConfirm}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModalDelete;
