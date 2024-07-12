import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/rootModel.css";
import {
  FaBook,
  FaTrash,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
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
  const [selectedPrice, setSelectedPrice] = useState(null);

  const [newSubRoutine, setNewSubRoutine] = useState({
    departure: "",
    destination: "",
    price: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState({});

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
        setRootBuses(
          response.data.map((bus) => ({
            ...bus,
            subRoutines: bus.subRoutines || [],
          }))
        );
        setFilteredBuses(
          response.data.map((bus) => ({
            ...bus,
            subRoutines: bus.subRoutines || [],
          }))
        );
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
        rootBuses.filter(
          (bus) =>
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

  const handleBookClick = (bus, price = null) => {
    setShowCardModal(true);
    setSelectedBus(bus);
    setSelectedPrice(price);
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
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${printBus.departures[0].from}-${printBus.arrivals[0].to}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const addSubRoutine = async (busId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/auth/addSubRoutine/${busId}`,
        newSubRoutine
      );
      const updatedBus = response.data;
      setRootBuses(
        rootBuses.map((bus) => (bus._id === busId ? updatedBus : bus))
      );
      setFilteredBuses(
        filteredBuses.map((bus) => (bus._id === busId ? updatedBus : bus))
      );
      toast.success("Sub-routine added successfully.");
      setNewSubRoutine({ departure: "", destination: "", price: "" });
    } catch (error) {
      console.error("Failed to add sub-routine:", error);
    }
  };

  const deleteSubRoutine = async (busId, subRoutineIndex) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/auth/deleteSubRoutine/${busId}/${subRoutineIndex}`
      );
      const updatedBus = response.data;
      setRootBuses(
        rootBuses.map((bus) => (bus._id === busId ? updatedBus : bus))
      );
      setFilteredBuses(
        filteredBuses.map((bus) => (bus._id === busId ? updatedBus : bus))
      );
      toast.success("Sub-routine deleted successfully.");
    } catch (error) {
      console.error("Failed to delete sub-routine:", error);
      toast.error("Failed to delete sub-routine.");
    }
  };

  const toggleDropdown = (busId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [busId]: !prevState[busId],
    }));
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

        <ul className="ul">
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
                <div className="sub2">
                  <div className="divv">Vehicle Number: {bus.busNumber}</div>
                  <div className="divv">Contact Number: {bus.phone}</div>
                  <div className="divv">Fee: {bus.price}</div>
                  {userDetails.email === bus.email && (
                    <div className="subroutines">
                      <input
                        type="text"
                        placeholder="Departure"
                        value={newSubRoutine.departure}
                        onChange={(e) =>
                          setNewSubRoutine({
                            ...newSubRoutine,
                            departure: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Destination"
                        value={newSubRoutine.destination}
                        onChange={(e) =>
                          setNewSubRoutine({
                            ...newSubRoutine,
                            destination: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Amount"
                        value={newSubRoutine.price}
                        onChange={(e) =>
                          setNewSubRoutine({
                            ...newSubRoutine,
                            price: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => addSubRoutine(bus._id)}
                        className="addroutoine"
                      >
                        Add Sub-Routine
                      </button>
                    </div>
                  )}
                  <div className="divv_2">
                    <div className="custom-dropdown">
                      <div
                        className="dropdown-header"
                        onClick={() => toggleDropdown(bus._id)}
                      >
                        <span className="subrotes">
                          {bus.subRoutines.length > 0
                            ? "see all sub routes"
                            : "No Sub-Routines"}
                        </span>
                        {dropdownOpen[bus._id] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                      {dropdownOpen[bus._id] && (
                        <div className="dropdown-body">
                          {bus.subRoutines.map((sub, subIndex) => (
                            <div key={subIndex} className="dropdown-item">
                              <span className="option">
                                <h3 className="h3">{sub.departure}</h3>
                                <h3 className="h3">{sub.destination}</h3>
                                <h3 className="h3">Rs.{sub.price}.00</h3>
                                <FaBook
                                  onClick={() => handleBookClick(sub)}
                                  className="bookicon"
                                />
                              </span>
                              {userDetails.email === bus.email && (
                                <button
                                  className="delete_btn_2"
                                  onClick={() =>
                                    deleteSubRoutine(bus._id, subIndex)
                                  }
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="div_2">
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
