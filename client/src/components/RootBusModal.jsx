import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/rootModel.css";
import { FaBook, FaTrash, FaPrint, FaDownload } from "react-icons/fa";
import CardModal from "./CardModal"; // Component for the card details modal
import { toast, ToastContainer } from "react-toastify";

const RootBusModal = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({});
  const [rootBuses, setRootBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [printBus, setPrintBus] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userinfo && userinfo.email) {
          const email = userinfo.email;

          const schoolBusResponse = await axios.get(
            `http://localhost:3001/auth/getRootBus/${email}`
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
    const fetchRootBuses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getRootBuses"
        );
        setRootBuses(response.data);
        setFilteredBuses(response.data);
      } catch (error) {
        console.error("Failed to fetch root buses:", error);
      }
    };
    fetchRootBuses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredBuses(rootBuses);
    } else {
      setFilteredBuses(
        rootBuses.filter((bus) =>
          bus.departures.some((dep) =>
            dep.from.toLowerCase().includes(e.target.value.toLowerCase())
          ) ||
          bus.arrivals.some((arr) =>
            arr.to.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      );
    }
  };

  const handleBookClick = (bus) => {
    setShowCardModal(true);
    setSelectedBus(bus);
  };

  const handleCloseCardModal = () => {
    setShowCardModal(false);
    setSelectedBus(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/auth/deleteRootBus/${id}`);
      setRootBuses(rootBuses.filter((bus) => bus._id !== id));
      setFilteredBuses(filteredBuses.filter((bus) => bus._id !== id));
      toast.success("Bus deleted successfully.");
    } catch (error) {
      console.error("Failed to delete bus:", error);
    }
  };

  const handlePrintClick = (bus) => {
    setPrintBus(bus);
  };

  const handleDownloadClick = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(printBus, null, 2)], {
      type: "application/json"
    });
    element.href = URL.createObjectURL(file);
    element.download = `${printBus.departures[0].from}-${printBus.arrivals[0].to}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="mainModal">
      <div className="subModal">
        <div className="button-container">
          <h2>Root Buses</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search by departure or arrival name"
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
                <h3>
                  {bus.departures[0].from} - {bus.arrivals[0].to}
                </h3>
                <FaBook
                  onClick={() => handleBookClick(bus)}
                  className="bookicon"
                />
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
                  <div className="divv">Price: {bus.price}</div>
                  <div className="arr1">
                    <div className="dep1">
                      <div className="dipheading">Departures:</div>
                      <div className="dep2">
                        {bus.departures.map((dep, depIndex) => (
                          <div key={depIndex} className="dep3">
                            {dep.from} at {dep.time}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="dep1">
                      <div className="dipheading">Arrivals:</div>
                      <div className="dep2">
                        {bus.arrivals.map((arr, arrIndex) => (
                          <div key={arrIndex} className="dep3">
                            {arr.to} by {arr.time}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showCardModal && (
        <CardModal onClose={handleCloseCardModal} rootDetails={selectedBus} />
      )}
      {printBus && (
        <div className="print-modal">
          <div className="print-modal-content">
            <h2>Print Bus Details</h2>
            <pre>{JSON.stringify(printBus, null, 2)}</pre>
            <button onClick={handleDownloadClick}>
              <FaDownload /> Download
            </button>
            <button onClick={() => setPrintBus(null)}>Close</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RootBusModal;
