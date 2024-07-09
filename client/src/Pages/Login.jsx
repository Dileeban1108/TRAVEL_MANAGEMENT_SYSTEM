import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      localStorage.setItem("userinfo", JSON.stringify({ email: email }));
      setTimeout(() => {
        navigate("/");
        toast.success("Successfully logged in!");
      }, 2000);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="r_container">
      <ToastContainer />
      <div className="optional">
        <div className="link">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
      <div className="r_main_container">
        <form className="r_form" onSubmit={handleSubmit}>
          <div className="input_boxes">
            <input
              className="input-field"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="submit-btn_10">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
