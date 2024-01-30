import React from "react";
import "./ModalDelete.css";

const ModalDelete = ({
  isOpen,
  text,
  closeBtnTxt,
  onClose,
  actionBtnTxt,
  onAction,
}) => {
  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p className="modal-description">{text}</p>
        <button className="modal-close-btn" onClick={onClose}>
          {closeBtnTxt}
        </button>
        <button className="modal-action-btn" onClick={onAction}>
          {actionBtnTxt}
        </button>
      </div>
    </div>
  );
};

export default ModalDelete;
