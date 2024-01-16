import { useState } from "react";
import React from "react";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password);
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section className="success">
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
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
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />{" "}
            <br />
            <label htmlFor="email">Email:</label> <br />
            <input
              className="input-field"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
            <br />
            <label htmlFor="password">Password:</label> <br />
            <input
              className="input-field"
              type="password"
              id="password"
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
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
