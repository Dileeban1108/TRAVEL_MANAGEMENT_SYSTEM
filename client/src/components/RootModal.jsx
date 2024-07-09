import React, { useState } from "react";
import "../styles/rootModel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const RootModal = ({ roots, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBookIconClick = (route) => {
    setSelectedRoute(route);
    setShowPaymentModal(true);
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePaymentSubmit = () => {
    if (cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv) {
      alert(
        `Payment successful for route: ${selectedRoute}\nReceipt Number: ${Math.floor(
          Math.random() * 1000000
        )}`
      );
      setShowPaymentModal(false);
    } else {
      alert("Please fill in all card details");
    }
  };

  const filteredRoots = roots.filter((root) =>
    root.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="button-container">
            <h2>Find your route</h2>
            <button className="close-button" onClick={onClose}>
              X
            </button>
          </div>
          <div className="search">
            <input
              type="text"
              className="search-bar"
              placeholder="Search route..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="root-list">
            {filteredRoots.map((root, index) => (
              <div key={index} className="root-box">
                <div className="heders">
                  <h3>{root.name}</h3>
                  <FontAwesomeIcon
                  className="book"
                    icon={faBook}
                    onClick={() => handleBookIconClick(root.name)}
                  />
                </div>
                <h4 className="places">
                  Departure from {root.departure} at {root.departureTime} and
                  arriving to {root.arrival} at {root.arrivalTime}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <div className="payment-modal">
          <h2>Payment for {selectedRoute}</h2>
          <div className="card_img">
            
          </div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handlePaymentChange}
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={cardDetails.expiryDate}
            onChange={handlePaymentChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handlePaymentChange}
          />
          <div className="button-container_2">
            <button className="optbtn cancel" onClick={() => setShowPaymentModal(false)}>Cancel</button>
            <button  className="optbtn pay"  onClick={handlePaymentSubmit}>Pay</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RootModal;
