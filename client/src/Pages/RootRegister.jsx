import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCog } from "react-icons/fa";
import HelpModal from '../components/HelpModal';

const RootRegister = () => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [idFrontImage, setIdFrontImage] = useState(null);
  const [idBackImage, setIdBackImage] = useState(null);
  const [busImage, setBusImage] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [chasisNumber, setChasisNumber] = useState("");
  const [departures, setDepartures] = useState([{ from: "", time: "" }]);
  const [arrivals, setArrivals] = useState([{ to: "", time: "" }]);
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
    formData.append("price", price);
    formData.append("address", address);
    formData.append("idNumber", idNumber);
    formData.append("busNumber", busNumber);
    formData.append("chasisNumber", chasisNumber);
    formData.append("departures", JSON.stringify(departures)); // convert to JSON string
    formData.append("arrivals", JSON.stringify(arrivals)); // convert to JSON string

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
        "http://localhost:3001/register/rootRegister",
        {
          username,
          email,
          password,
          phone,
          price,
          address,
          idNumber,
          busNumber,
          chasisNumber,
          idFrontImage,
          idBackImage,
          busImage,
          departures: JSON.stringify(departures), // convert to JSON string
          arrivals: JSON.stringify(arrivals), // convert to JSON string
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

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    if (file && file.type.substring(0, 5) === "image") {
      if (name === "idFrontImage") setIdFrontImage(file);
      if (name === "idBackImage") setIdBackImage(file);
      if (name === "busImage") setBusImage(file);
    }
  };

  const handleAddDeparture = () => {
    setDepartures([...departures, { from: "", time: "" }]);
  };

  const handleAddArrival = () => {
    setArrivals([...arrivals, { to: "", time: "" }]);
  };

  const handleDepartureChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDepartures = [...departures];
    if (name === "time") {
      const [time, period] = value.split(" ");
      const [hours, minutes] = time.split(":");
      updatedDepartures[index].hours = hours;
      updatedDepartures[index].minutes = minutes;
      updatedDepartures[index].period = period;
    } else {
      updatedDepartures[index][name] = value;
    }
    setDepartures(updatedDepartures);
  };

  const handleArrivalChange = (index, event) => {
    const { name, value } = event.target;
    const updatedArrivals = [...arrivals];
    if (name === "time") {
      const [time, period] = value.split(" ");
      const [hours, minutes] = time.split(":");
      updatedArrivals[index].hours = hours;
      updatedArrivals[index].minutes = minutes;
      updatedArrivals[index].period = period;
    } else {
      updatedArrivals[index][name] = value;
    }
    setArrivals(updatedArrivals);
  };

  const handleRemoveDeparture = (index) => {
    const updatedDepartures = [...departures];
    updatedDepartures.splice(index, 1);
    setDepartures(updatedDepartures);
  };

  const handleRemoveArrival = (index) => {
    const updatedArrivals = [...arrivals];
    updatedArrivals.splice(index, 1);
    setArrivals(updatedArrivals);
  };
  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    navigate("/");
  };
  const renderDepartures = () =>
    departures.map((departure, index) => (
      <div key={index} className="more_arrdep">
        <div className="time-input">
          <input
            type="text"
            name="from"
            value={departure.from}
            onChange={(e) => handleDepartureChange(index, e)}
            placeholder="Departure from"
            required
            className="input-field_3"
          />
          <input
            className="input-field-small"
            type="number"
            name="hours"
            value={departure.hours}
            onChange={(e) => handleDepartureChange(index, e)}
            placeholder="HH"
            min="1"
            max="12"
            required
          />
          :
          <input
            className="input-field-small"
            type="number"
            name="minutes"
            value={departure.minutes}
            onChange={(e) => handleDepartureChange(index, e)}
            placeholder="MM"
            min="0"
            max="59"
            required
          />
          <select
            className="input-field-small_select"
            name="period"
            value={departure.period}
            onChange={(e) => handleDepartureChange(index, e)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        {index > 0 && (
          <button type="button" onClick={() => handleRemoveDeparture(index)}>
            Remove
          </button>
        )}
      </div>
    ));

  const renderArrivals = () =>
    arrivals.map((arrival, index) => (
      <div key={index} className="more_arrdep">
        <div className="time-input">
          <input
            className="input-field_3"
            type="text"
            name="to"
            value={arrival.to}
            onChange={(e) => handleArrivalChange(index, e)}
            placeholder="Arrival to"
            required
          />
          <input
            className="input-field-small"
            type="number"
            name="hours"
            value={arrival.hours}
            onChange={(e) => handleArrivalChange(index, e)}
            placeholder="HH"
            min="1"
            max="12"
            required
          />
          :
          <input
            className="input-field-small"
            type="number"
            name="minutes"
            value={arrival.minutes}
            onChange={(e) => handleArrivalChange(index, e)}
            placeholder="MM"
            min="0"
            max="59"
            required
          />
          <select
            className="input-field-small"
            name="period"
            value={arrival.period}
            onChange={(e) => handleArrivalChange(index, e)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div>
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveArrival(index)}>
              Remove
            </button>
          )}
        </div>
      </div>
    ));
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
          <label htmlFor="id_image">Upload NIC Front</label>
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
          <label htmlFor="id_image_back">Upload NIC Back</label>
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
          <label htmlFor="bus_image">Upload Your Bus Image</label>
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
      <input
        className="input-field_2"
        type="text"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Bus Fee From The Departure to Arrival"
        required
      />

      <div className="arrivdep">
        <div className="departures">
          <h3>Departures</h3>
          {renderDepartures()}
          <button type="button" onClick={handleAddDeparture}>
            Add more departures
          </button>
        </div>
        <div className="arrivals">
          <h3>Arrivals</h3>
          {renderArrivals()}
          <button type="button" onClick={handleAddArrival}>
            Add more arrivals
          </button>
        </div>
      </div>

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
  const validateTime = (timeStr) => {
    const regex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i; // HH:MM AM/PM format
    return regex.test(timeStr);
  };

  return (
    <div className="r_container_2">
      <div className="r_ultra_container">
        <ToastContainer position="top-right" />
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

export default RootRegister;
