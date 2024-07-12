import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import "../styles/cardModal.css";
import axios from "axios";

const CardModal = ({ onClose, rootDetails }) => {
  const [price, setPrice] = useState("");
  const [receipt, setReceipt] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (rootDetails) {
      setPrice(rootDetails.price);
    }
  }, [rootDetails]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/register/addNewCard", {
        cardNumber: data.cardNumber,
        price,
        cvv: data.cvv,
        expDate: data.expDate,
      });
      const uniqueNumber = Math.random().toString(36).substring(2, 15);
      setReceipt({
        uniqueNumber,
        cardNumber: data.cardNumber,
        expDate: data.expDate,
        cvv: data.cvv,
        price,
      });
    } catch (error) {
      console.error("Error submitting card details:", error);
    }
  };

  const closeReceipt = () => {
    setReceipt(null);
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.text("Payment Successful!", 10, 10);
    doc.text(`Reference Number: ${receipt.uniqueNumber}`, 10, 20);
    doc.text(`Card Number: ${receipt.cardNumber}`, 10, 30);
    doc.text(`Expiry Date: ${receipt.expDate}`, 10, 40);
    doc.text(`Amount: ${receipt.price}`, 10, 50);
    doc.save("receipt.pdf");
  };

  return (
    <div className="card-modal">
      <div className="card-modal-content">
        <div className="cards">
          <h2>Enter Card Details</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="card_img"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              placeholder="Card Number [0000 0000 0000 0000]"
              type="text"
              {...register("cardNumber", { required: true, pattern: /^\d{16}$/ })}
            />
            {errors.cardNumber && <p className="error">Please enter a valid 16-digit card number.</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Expiry Date [mm/yy]"
              type="text"
              {...register("expDate", { required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/ })}
            />
            {errors.expDate && <p className="error">Please enter a valid expiry date (MM/YY).</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="CVV"
              type="text"
              {...register("cvv", { required: true, pattern: /^[0-9]{3,4}$/ })}
            />
            {errors.cvv && <p className="error">Please enter a valid CVV (3-4 digits).</p>}
          </div>
          <div className="form-group">
            <input type="text" value={price} readOnly />
          </div>
          <button type="submit" className="final_btn">
            Submit
          </button>
        </form>
      </div>

      {receipt && (
        <div className="receipt-popup">
          <div className="receipt-content">
            <h3>Payment Successful!</h3>
            <p>Reference Number: {receipt.uniqueNumber}</p>
            <p>Card Number: {receipt.cardNumber}</p>
            <p>Expiry Date: {receipt.expDate}</p>
            <p>Amount: {receipt.price}</p>
            <button className="close-button" onClick={closeReceipt}>Close</button>
            <button className="download-button" onClick={downloadReceipt}>
              Download Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardModal;
