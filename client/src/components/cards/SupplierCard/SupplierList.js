import React, { useEffect, useState } from "react";
import "./SupplierList.css";
import ModalDelete from "../../Modals/ModalDelete";
import ModalEditSupplier from "../../Modals/ModalEditSupplier";

const SupplierList = ({ id }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("/api/v1/supplier", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.err);
  }, []);

  return (
    <div className="suppliercard-container">
      {suppliers.map((supplier) => (
        <div key={supplier._id} className="suppliercard">
          <div className="suppliername">
            <b>{supplier.name}</b>
          </div>
          <p className="supplieraddress">
            <b>Address: </b>
            {supplier.address}
          </p>
          <hr></hr>
          <p className="supplierphonenumber">
            <b>Phone number: </b>
            {supplier.phonenumber}
          </p>
          <hr></hr>
          <p className="supplieremail">
            <b>Email: </b>
            {supplier.email}
          </p>
          <hr></hr>
          <div className="supplierbtn">
            <button onClick={() => setOpenModal(true)}>
              <img
                className="editbtn"
                src={require("../../../images/editbtn.png")}
                alt="editbtn"
              />
            </button>
            <button onClick={() => setOpenModal(true)}>
              <img
                className="deletebtn"
                src={require("../../../images/deletebtn.png")}
                alt="deletebtn"
                width={20}
                height={20}
              />
            </button>
          </div>
          <ModalDelete open={openModal} onClose={() => setOpenModal(false)} />
          <ModalEditSupplier
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
      ))}
    </div>
  );
};

export default SupplierList;
