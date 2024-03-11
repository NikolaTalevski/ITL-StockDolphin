import React, { useEffect, useState } from "react";
import "./SupplierList.css";
import ModalDelete from "../../Modals/ModalDelete";
import ModalEditSupplier from "../../Modals/ModalEditSupplier";

const SupplierList = (props) => {
  const [suppliers, setSuppliers] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    if (props.newSupplies !== null)
      setSuppliers([...suppliers, props.newSupplies]);
  }, [props.newSupplies]);

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

  const handleDeleteClick = (supplierId) => {
    setSelectedSupplierId(supplierId);
    setOpenDeleteModal(true);
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenEditModal(true);
  };

  const handleDeleteSupplier = async () => {
    try {
      const res = await fetch(`/api/v1/supplier/${selectedSupplierId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!res.ok) {
        throw "Failed to delete supplier";
      }
      setSuppliers(
        suppliers.filter((supplier) => supplier._id !== selectedSupplierId)
      );
      setOpenDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSupplier = async (name, address, phonenumber, email) => {
    try {
      const res = await fetch(`/api/v1/supplier/${selectedSupplier._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ name, address, phonenumber, email }),
      });
      if (!res.ok) {
        throw "Failed to edit supplier";
      }
      const editedSupplier = {
        ...selectedSupplier,
        name,
        address,
        phonenumber,
        email,
      };
      setSuppliers(
        suppliers.map((s) =>
          s._id === selectedSupplier._id ? editedSupplier : s
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

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
            <button
              className="edit-supp-btn"
              onClick={() => handleEditClick(supplier)}
            >
              <img
                className="editbtn"
                src={require("../../../images/editbtn.png")}
                alt="editbtn"
              />
            </button>
            <button
              className="del-supp-btn"
              onClick={() => handleDeleteClick(supplier._id)}
            >
              <img
                className="deletebtn"
                src={require("../../../images/deletebtn.png")}
                alt="deletebtn"
                width={20}
                height={20}
              />
            </button>
          </div>
          <ModalDelete
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onDelete={handleDeleteSupplier}
            text={"Are you sure you want to delete this supplier?"}
          />
          <ModalEditSupplier
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            onUpdate={handleEditSupplier}
            supplier={selectedSupplier}
          />
        </div>
      ))}
    </div>
  );
};

export default SupplierList;
