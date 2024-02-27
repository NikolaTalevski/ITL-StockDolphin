import React, { useEffect, useState } from "react";

const ModalEditCategory = ({ open, onClose, onUpdate, category }) => {
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (category) {
      setEditedName(category.name);
    }
  }, [category]);

  if (!open) return null;

  const handleUpdate = () => {
    onUpdate(editedName);
    onClose();
  };

  return (
    <div className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <header className="modal-container-header">
          <h4>Edit Category</h4>
          <p onClick={onClose}>X</p>
        </header>
        <input
          className="modal-container-input"
          placeholder="Name"
          name="name"
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <div className="modal-bottom">
          <button className="modal-close-btn" onClick={onClose}>
            CANCEL
          </button>
          <button className="modal-add-btn" onClick={handleUpdate}>
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditCategory;
