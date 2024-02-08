import React, { useEffect, useState } from "react";

const SupplierCard = ({ supplier }) => {
  console.log("Supplier in SupplierCard:", supplier);
  return (
    <div>
      <header>{supplier.name}</header>
      <h4>{supplier.address}</h4>
      <h4>{supplier.phonenumber}</h4>
      <h4>{supplier.email}</h4>
    </div>
  );
};

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await fetch("/api/v1/supplier", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setSuppliers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {suppliers.map((supplier, index) => {
        <SupplierCard key={index} supplier={supplier} />;
      })}
    </div>
  );
};

export default SupplierList;
