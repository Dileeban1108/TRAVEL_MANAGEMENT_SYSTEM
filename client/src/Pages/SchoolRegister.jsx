import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchoolRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [regnumber, setRegNumber] = useState("");
  const [hospital, setHospital] = useState("");
  const [specialization, setSpecialization] = useState("");

  const specializationOptions = [
    "none",
    "Eye Specialist",
    "Skin Specialist",
    "Ear Specialist",
    "Heart Specialist",
    "Liver Specialist",
    "Kidney Specialist",
    "Dentist",
    "Veterinarian",
    "Radiologist",
    "Physiotherapist",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one special character"
      );
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
        phone,
        address,
        regnumber,
        hospital,
        specialization,
      });
      if (response && response.data.success) {
        toast.success("Successfully created an account!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="r_container_2">
      <ToastContainer position="top-right" />

      <div className="r_main_container_2">
        <form className="r_form_2" onSubmit={handleSubmit}>
          <div className="input_boxes_2">
            <input
              className="input-field_2"
              type="text"
              id="username"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
              type="text"
              id="idnumber"
              name="idnumber"
              placeholder="Identity Number"
              value={email}
              onChange={(e) => setIdNumber(e.target.value)}
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
            <input
              className="input-field_2"
              type="text"
              id="busnumber"
              name="busnumber"
              value={busnumber}
              onChange={(e) => setBusNumber(e.target.value)}
              placeholder="Bus Number"
              required
            />
            <input
              className="input-field_2"
              type="text"
              id="chasisnumber"
              name="chasisnumber"
              value={chasisnumber}
              onChange={(e) => setChasisnumber(e.target.value)}
              placeholder="Chasis Number"
              required
            />
            <input
              className="input-field_2"
              type="number"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
            <select
              className="input-field-select_2"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            >
              {specializationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn_10">
            Sign Up
          </button>
          <div className="optional2">
            <div className="link">
              Already have an account? <a href="/login">LogIn</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolRegister;
