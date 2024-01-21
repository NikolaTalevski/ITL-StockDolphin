import React from "react";
import "./AddButton.css";

const AddButton = ({ model }) => {
  return (
    <div className="add">
      <button className="add-btn">
        <img src={require("../../images/addnew.png")} alt="addnew" />
        <span>ADD {model}</span>
      </button>
    </div>
  );
};

export default AddButton;
