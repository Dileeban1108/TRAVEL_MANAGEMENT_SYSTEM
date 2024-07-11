import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/rootModel.css";
import { toast, ToastContainer } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import CardModal from "./CardModal"; // Component for the card details modal

const SchoolBusModal = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({});
  const [schoolBuses, setSchoolBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCardModal, setShowCardModal] = useState(false);

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
            setUserDetails(schoolBusResponse.data);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchSchoolBuses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getSchoolBuses"
        );
        setSchoolBuses(response.data);
        setFilteredBuses(response.data);

      } catch (error) {
        console.error("Failed to fetch school buses:", error);
      }
    };
    fetchSchoolBuses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredBuses(schoolBuses);
    } else {
      setFilteredBuses(
        schoolBuses.filter((bus) =>
          bus.address.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleBookClick = (bus) => {
    setShowCardModal(true);
  };

  const handleCloseCardModal = () => {
    setShowCardModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/auth/deleteSchoolBus/${id}`);
      setSchoolBuses(schoolBuses.filter((bus) => bus._id !== id));
      setFilteredBuses(filteredBuses.filter((bus) => bus._id !== id));
      toast.success("please signup again with new credwntials");

    } catch (error) {
      console.error("Failed to delete bus:", error);
    }
  };

  return (
    <div className="mainModal">
            <ToastContainer position="top-right" />

      <div className="subModal">
        <div className="button-container">
          <h2>School Buses</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search by address"
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
            style={{ width: "80%", backgroundColor: "#ff91003f" }}
          />
        </div>
        <ul>
          {filteredBuses.map((bus, index) => (
            <li key={index}>
              <div className="heading">
                <h3>{bus.username}</h3>
                {userDetails.email === bus.email && (
                  <FaTrash
                    onClick={() => handleDelete(bus._id)}
                    className="bookicon"
                  />
                )}
              </div>
              <div className="sub3">
                <div className="sub1">
                  <img src={bus.busImage} alt="" />
                </div>
                <div className="sub2">
                  <div className="divv">Vehicle Number: {bus.busNumber}</div>
                  <div className="divv">Contact Number: {bus.phone}</div>
                  <div className="divv">Address: {bus.address}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showCardModal && <CardModal onClose={handleCloseCardModal} />}
    </div>
  );
};

export default SchoolBusModal;
