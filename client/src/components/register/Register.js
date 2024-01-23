import { useState } from "react";
import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password);
    setSuccess(true);

    try {
      let res = await fetch("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw "Error registering";
      }
      let data = await res.json();
      localStorage.setItem("jwt", data.token);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {success ? (
        <section className="success">
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section className="register">
          <h1 className="top">Sign Up</h1>
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="username">Username:</label>
            <br />
            <input
              className="input-field"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />{" "}
            <br />
            <label htmlFor="email">Email:</label> <br />
            <input
              className="input-field"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
            <br />
            <label htmlFor="password">Password:</label> <br />
            <input
              className="input-field"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />{" "}
            <br />
            <button className="btn">Sign Up</button>
          </form>
          <p>
            Already registered? <br />
            <span className="btn-signin">
              {/* put router link here */}
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
