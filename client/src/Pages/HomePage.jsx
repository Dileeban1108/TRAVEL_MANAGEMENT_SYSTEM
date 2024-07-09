import React, { useState, useEffect } from "react";
import "../styles/homepage.css";
import Footer from "../components/Footer";
import MainPage from "./MainPage";
import AboutUs from "./About";
import ReviewPage from "./ReviewPage";
import RootModal from "../components/RootModal";

const HomePage = () => {
  const [rootData, setRootData] = useState([]);
  const [showAllRoots, setShowAllRoots] = useState(false);
  const routes = [
    {
      name: "Colombo - Gampaha",
      departure: "Colombo",
      departureTime: "10:30 AM",
      arrival: "Gampaha",
      arrivalTime: "12:00 PM",
    },
    {
      name: "Gampaha - Colombo",
      departure: "Gampaha",
      departureTime: "1:30 PM",
      arrival: "Colombo",
      arrivalTime: "3:00 PM",
    },
    {
      name: "Kandy - Colombo",
      departure: "Kandy",
      departureTime: "8:00 AM",
      arrival: "Colombo",
      arrivalTime: "11:00 AM",
    },
    {
      name: "Colombo - Kandy",
      departure: "Colombo",
      departureTime: "2:00 PM",
      arrival: "Kandy",
      arrivalTime: "5:00 PM",
    },
    {
      name: "Malalpola - Avissavella",
      departure: "Malalpola",
      departureTime: "10:30 AM",
      arrival: "Avissavella",
      arrivalTime: "12:00 PM",
    },
    {
      name: "Avissavella - Malalpola",
      departure: "Avissavella",
      departureTime: "1:30 PM",
      arrival: "Malalpola",
      arrivalTime: "3:00 PM",
    },
  ];

  useEffect(() => {
    const fetchRoots = async () => {
      try {
        const result = routes;
        setRootData(result);
      } catch (error) {
        console.error("Failed to fetch roots:", error);
      }
    };
    fetchRoots();
  }, []);

  const handleViewMore = () => {
    setShowAllRoots(!showAllRoots);
  };

  return (
    <section className="home">
      <MainPage id="main" />
      <div className="empty"></div>

      <div className="main-home-container">
        <div className="home-container">
          <div className="view-more bus3" onClick={handleViewMore}>
            <div className="bus-text">School Buses</div>
          </div>
          <div className="view-more bus2" onClick={handleViewMore}>
            <div className="bus-text">Root Buses</div>
          </div>
        </div>
      </div>

      {showAllRoots && <RootModal roots={rootData} onClose={handleViewMore} />}
      <div className="ultracontainer">
        <AboutUs id="aboutus" />
        <ReviewPage id="reviews" />
        <Footer />
      </div>
    </section>
  );
};

export default HomePage;
