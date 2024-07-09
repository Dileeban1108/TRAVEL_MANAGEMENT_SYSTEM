import React, { useState } from "react";
import "../styles/mainpage.css";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa"; // Using react-icons for the settings icon
import Modal from "../components/Modal"; // Assuming Modal component exists

const MainPage = () => {
  const [currentPlace, setCurrentPlace] = useState("");
  const [destination, setDestination] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationType, setRegistrationType] = useState("");

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearch = () => {
    // Logic for handling search can be added here
    console.log("Current Place:", currentPlace);
    console.log("Destination:", destination);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSignUp = () => {
    setShowRegistrationModal(true);
  };

  const handleRegistrationChoice = (choice) => {
    if (choice === "school") {
      setRegistrationType("school");
      handleNavigate("/SchoolRegister");
    } else {
      setRegistrationType("root");
      handleNavigate("/RootRegister");
    }
    setShowRegistrationModal(false);
  };

  return (
    <section className="main">
      <div className="main_container">
        <div className="doctor-register">
          <div className="header">
            <div className="hederheading">
              <FaCog
                className={`settings-icon ${isSettingsOpen ? "rotate" : ""}`}
                onClick={toggleSettings}
              />
            </div>

            {isSettingsOpen && (
              <div className="settings-menu">
                <button onClick={() => handleNavigate("/")}>Home</button>
                <button onClick={() => handleNavigate("/register")}>
                  Register
                </button>
                <button onClick={() => handleNavigate("/about")}>About</button>
                <button onClick={() => handleNavigate("/about")}>About</button>
                <button onClick={() => handleNavigate("/about")}>About</button>
                <button onClick={() => handleNavigate("/about")}>About</button>
                <button onClick={() => handleNavigate("/about")}>About</button>
              </div>
            )}
            <div className="hederbtns">
              <button
                className="header_btn1"
                onClick={() => handleNavigate("/login")}
              >
                Sign In
              </button>
              <button className="header_btn" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="contents">
            <div className="content1">
              <input
                type="text"
                placeholder="Enter current place"
                value={currentPlace}
                onChange={(e) => setCurrentPlace(e.target.value)}
                className="search-bar"
              />
              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="search-bar"
              />
            </div>
            <div className="content2">
              <button className="main-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRegistrationModal && (
        <Modal>
          <div className="registration-modal">
            <div className="modal_header">
              <p>Do you want to register as a School Bus or Root Bus?</p>
              <span className="close" onClick={() => setShowRegistrationModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-buttons">
              <button className="option_btns btn1" onClick={() => handleRegistrationChoice("school")}>
                School Bus
              </button>
              <button className="option_btns btn2" onClick={() => handleRegistrationChoice("root")}>
                Root Bus
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default MainPage;
