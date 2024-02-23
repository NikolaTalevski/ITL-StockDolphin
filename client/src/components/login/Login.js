import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw "Error logging in";
      }

      let data = await res.json();
      localStorage.setItem("username", username);
      localStorage.setItem("jwt", data.token);
      setSuccess(true);
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
            <Link to="/dashboard">Home</Link>
          </p>
        </section>
      ) : (
        <section className="login">
          <h1 className="top">Sign In</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="input-field"
              placeholder="Enter your username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <input
              className="input-field"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              className="input-field"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button className="btn">Sign In</button>
          </form>
          <p>
            Don't have an account? <br />
            <span className="btn-signup">
              {/* put router link here */}
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
