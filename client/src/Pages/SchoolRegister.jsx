import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCog } from "react-icons/fa";
import HelpModal from '../components/HelpModal';

const SchoolRegister = () => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [idFrontImage, setIdFrontImage] = useState(null);
  const [idBackImage, setIdBackImage] = useState(null);
  const [busImage, setBusImage] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [chasisNumber, setChasisNumber] = useState("");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("idFrontImage", idFrontImage);
    formData.append("idBackImage", idBackImage);
    formData.append("busImage", busImage);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("idNumber", idNumber);
    formData.append("busNumber", busNumber);
    formData.append("chasisNumber", chasisNumber);
    try {
      const uploadResponse = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { idFrontImage, idBackImage, busImage } = uploadResponse.data;

      const response = await axios.post(
        "http://localhost:3001/register/schoolRegister",
        {
          username,
          email,
          password,
          phone,
          address,
          idNumber,
          busNumber,
          chasisNumber,
          idFrontImage,
          idBackImage,
          busImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration response:", response.data);
      navigate("/");

      // Handle success or other logic here
    } catch (error) {
      console.error("Error during registration:", error.message);
      // Handle error responses here
    }
  };
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    navigate("/");
  };
  const handleImageChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    if (file && file.type.substring(0, 5) === "image") {
      if (name === "idFrontImage") setIdFrontImage(file);
      if (name === "idBackImage") setIdBackImage(file);
      if (name === "busImage") setBusImage(file);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const renderStepOne = () => (
    <>
      <div className="divs">
        <input
          className="input-field_2"
          type="text"
          id="busnumber"
          name="busnumber"
          placeholder="Vehicle Number [Ex : SG 1234]"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          required
        />
        <input
          className="input-field_2"
          type="text"
          id="chasisnumber"
          name="chasisnumber"
          placeholder="Chasis Number"
          value={chasisNumber}
          onChange={(e) => setChasisNumber(e.target.value)}
          required
        />
        <div className="bus_section">
          {idFrontImage && (
            <img
              src={URL.createObjectURL(idFrontImage)}
              className="id_image"
              alt="NIC Front"
            />
          )}
          <label htmlFor="id_image">
            Upload NIC Front
          </label>
        </div>
        <input
          id="id_image"
          className="id-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="idFrontImage"
          required
        />

        <div className="bus_section">
          {idBackImage && (
            <img
              src={URL.createObjectURL(idBackImage)}
              className="id_image"
              alt="NIC Back"
            />
          )}
          <label htmlFor="id_image_back">
            Upload NIC Back
          </label>
        </div>
        <input
          id="id_image_back"
          className="id-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="idBackImage"
          required
        />

        <div className="bus_section">
          {busImage && (
            <img
              src={URL.createObjectURL(busImage)}
              className="bus_img"
              alt="Bus Image"
            />
          )}
          <label htmlFor="bus_image">
            Upload Your Bus Image
            
          </label>
        </div>
        <input
          id="bus_image"
          className="id-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="busImage"
          required
        />

        <div className="divbtns">
          <button type="button" className="submit-btn" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="submit-btn btn_ultimate">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );

  const renderStepTwo = () => (
    <div className="divs">
      <input
        className="input-field_2"
        type="text"
        id="username"
        name="username"
        placeholder="Enter Your Name"
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
        id="idnumber"
        name="idnumber"
        placeholder="NIC Number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
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
      <input
        className="input-field_2"
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Your Address"
        required
      />

      <div className="divbtns">
        <button type="button" className="submit-btn" onClick={handleBack}>
          Back
        </button>
        <button
          type="button"
          className="submit-btn btn_ultimate"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );

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
            <button onClick={()=>setIsHelpModalOpen(true)}>Help</button>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
        <ToastContainer position="top-right" />
        <div className="r_main_container_2">
          <form className="r_form_2" onSubmit={handleSubmit}>
            {step === 2 && renderStepOne()}
            {step === 1 && renderStepTwo()}
          </form>
        </div>
      </div>
      <HelpModal show={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />

    </div>
  );
};

export default SchoolRegister;
