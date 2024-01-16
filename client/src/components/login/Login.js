import React, { useState } from "react";
import "./Login.css";

const Login = () => {
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
            <a href="#">Home</a>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <input
              className="input-field"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              className="input-field"
              placeholder="Enter your password"
              type="password"
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
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
