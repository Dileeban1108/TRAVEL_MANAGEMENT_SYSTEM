import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCog } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    navigate("/login");
  };
  return (
    <div className="r_container_2">
      <div className="r_ultra_container">
        <div className="hederheading_2">
          <FaCog
            className={`settings-icon ${isSettingsOpen ? "rotate" : ""}`}
            onClick={toggleSettings}
          />
        </div>
        {isSettingsOpen && (
          <div className="settings-menu">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/busFares")}>Bus Fares</button>
            <button onClick={() => navigate("/SchoolRegister")}>
              School Bus Register
            </button>
            <button onClick={() => navigate("/RootRegister")}>
              Root Bus Register
            </button>
            <button onClick={() => navigate("/about")}>Help</button>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
        <ToastContainer position="top-right" />
      <div className="r_main_container_2">
        <form className="r_form" onSubmit={handleSubmit}>
          <div className="input_boxes_2">
            <input
              className="input-field_2"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-field_2"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="submit-btn_1">
            Sign In
          </button>
          <button  className="submit-btn" onClick={handleBack} >
           Home
          </button>
          
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
