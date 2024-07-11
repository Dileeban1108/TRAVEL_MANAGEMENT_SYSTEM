import React, { useState,useEffect } from "react";
import "../styles/homepage.css";
import Footer from "../components/Footer";
import MainPage from "./MainPage";
import ReviewPage from "./ReviewPage";
import RootBusModal from "../components/RootBusModal";
import SchoolBusModal from "../components/SchoolBusModal";
import axios from "axios";

const HomePage = () => {
  const [showRootBusModal, setShowRootBusModal] = useState(false);
  const [showSchoolBusModal, setShowSchoolBusModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const handleNavigate1 = () => {
    setShowRootBusModal(true);
    setShowSchoolBusModal(false); // Ensure only one modal is open at a time
  };

  const handleNavigate2 = () => {
    setShowSchoolBusModal(true);
    setShowRootBusModal(false); // Ensure only one modal is open at a time
  };

  const handleCloseModal1 = () => {
    setShowRootBusModal(false);
  };

  const handleCloseModal2 = () => {
    setShowSchoolBusModal(false);
  };
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userinfo && userinfo.email) {
          const email = userinfo.email;

          const schoolBusResponse = await axios.get(
            `http://localhost:3001/auth/getSchoolBus/${email}`
          );

          if (schoolBusResponse.data) {
            setUserRole("schoolbus");
            setUserDetails(schoolBusResponse.data);
            return;
          }

          const rootBusResponse = await axios.get(
            `http://localhost:3001/auth/getRootBus/${email}`
          );

          if (rootBusResponse.data) {
            setUserRole("rootbus");
            setUserDetails(rootBusResponse.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <section className="home">
      {!showRootBusModal && !showSchoolBusModal && (
        <>
          <MainPage id="main" userRole={userRole} userDetails={userDetails}/>
          <div className="empty"></div>

          <div className="main-home-container">
            <div className="home-container">
              <div className="view-more bus3" onClick={handleNavigate2}>
                <div className="bus-text">School Buses</div>
              </div>
              <div className="view-more bus2" onClick={handleNavigate1}>
                <div className="bus-text">Root Buses</div>
              </div>
            </div>
          </div>

          <div className="ultracontainer">
            <ReviewPage id="reviews" userRole={userRole} userDetails={userDetails}/>
            <Footer />
          </div>
        </>
      )}

      {showRootBusModal && <RootBusModal onClose={handleCloseModal1} />}
      {showSchoolBusModal && <SchoolBusModal onClose={handleCloseModal2} />}
    </section>
  );
};

export default HomePage;
