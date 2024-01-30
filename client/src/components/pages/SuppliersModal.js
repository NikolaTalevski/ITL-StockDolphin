import React, { useState } from "react";

const SuppliersModal = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/v1/supplier", {
        method: "POST",
        body: JSON.stringify({ name, address, phonenumber, email }),
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      });
      let data = await res.json();
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          placeholder="Phonenumber"
          type="number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default SuppliersModal;
