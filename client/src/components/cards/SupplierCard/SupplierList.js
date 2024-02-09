import React, { useEffect, useState } from "react";
import "./SupplierList.css";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

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
            <button>
              <img
                src={require("../../../images/editbtn.png")}
                alt="editbtn"
                className="editbtn"
              />
            </button>
            <button>
              <img
                src={require("../../../images/deletebtn.png")}
                alt="deletebtn"
                className="deletebtn"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupplierList;
