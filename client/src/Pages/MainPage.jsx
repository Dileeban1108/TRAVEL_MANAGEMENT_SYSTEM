import React, { useState } from "react";
import "../styles/mainpage.css";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa"; // Using react-icons for the settings icon
import ProfileModal from "../components/ProfileModal";
import ProfileModal2 from "../components/ProfileModal2";
import Modal from "../components/Modal"; // Assuming Modal component exists
import HelpModal from "../components/HelpModal";

const MainPage = ({ userRole, userDetails }) => {
  const [currentPlace, setCurrentPlace] = useState("");
  const [destination, setDestination] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationType, setRegistrationType] = useState("");

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProfileModal2, setShowProfileModal2] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearch = () => {
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

  const handleUpdateProfileClick = () => {
    if (userRole === "schoolbus") {
      setShowProfileModal(true);
    } else if (userRole === "rootbus") {
      setShowProfileModal2(true);
    }
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleCloseProfileModal2 = () => {
    setShowProfileModal2(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    window.location.reload();
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
                <button onClick={() => handleNavigate("/busFares")}>
                  Bus Fares
                </button>
                <button onClick={() => handleNavigate("/SchoolRegister")}>
                  School Bus Register
                </button>
                <button onClick={() => handleNavigate("/RootRegister")}>
                  Root Bus Register
                </button>
                <button onClick={() => setIsHelpModalOpen(true)}>Help</button>
                {userRole && (
                  <>
                    <button onClick={handleUpdateProfileClick}>
                      Update Profile
                    </button>
                    <button onClick={handleLogout}>Log Out</button>
                  </>
                )}
              </div>
            )}
            {!userRole && (
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
            )}
          </div>
          <div className="contents">
            Welcome to our Travel Management System, designed to simplify and
            enhance every aspect of your travel experience. From seamless
            booking of flights, hotels, and transportation to personalized
            travel recommendations tailored to your preferences, we provide a
            comprehensive platform to plan and manage your journeys
            effortlessly. With real-time updates on travel itineraries,
            interactive maps, and robust support services including travel
            insurance and visa assistance, we ensure your travels are smooth and
            stress-free. Our commitment to security means your personal
            information is safeguarded, allowing you to travel with confidence.
            Experience exceptional customer service and unparalleled convenience
            with our user-friendly interface and dedicated support team,
            available around the clock to assist with any queries. Travel
            smarter, travel easier with our Travel Management System.
          </div>
        </div>
      </div>

      {userRole === "schoolbus" && (
        <ProfileModal
          show={showProfileModal}
          onClose={handleCloseProfileModal}
          userDetails={userDetails}
        />
      )}

      {userRole === "rootbus" && (
        <ProfileModal2
          show={showProfileModal2}
          onClose={handleCloseProfileModal2}
          userDetails={userDetails}
        />
      )}
      {showRegistrationModal && (
        <Modal>
          <div className="registration-modal">
            <div className="modal_header">
              <p>Do you want to register as a School Bus or Root Bus?</p>
              <span
                className="close"
                onClick={() => setShowRegistrationModal(false)}
              >
                &times;
              </span>
            </div>
            <div className="modal-buttons">
              <button
                className="option_btns btn1"
                onClick={() => handleRegistrationChoice("school")}
              >
                School Bus
              </button>
              <button
                className="option_btns btn2"
                onClick={() => handleRegistrationChoice("root")}
              >
                Root Bus
              </button>
            </div>
            <div className="orlogin">
              Or Already Have an Account
              <a href="login">Login Here</a>
            </div>
          </div>
        </Modal>
      )}
      <HelpModal
        show={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </section>
  );
};

export default MainPage;
