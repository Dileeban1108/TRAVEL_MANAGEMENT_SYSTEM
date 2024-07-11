// In CardModal component
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/cardModal.css";

const CardModal = ({ onClose, rootDetails }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (rootDetails) {
      setPrice(rootDetails.price);
    }
  }, [rootDetails]);

  const watchExpiryDate = watch("expiryDate", "");

  useEffect(() => {
    if (watchExpiryDate.length === 2 && !watchExpiryDate.includes("/")) {
      setValue("expiryDate", `${watchExpiryDate}/`);
    }
  }, [watchExpiryDate, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    // Handle card details submission
    printReceipt(data);
  };

  const printReceipt = (data) => {
    const receipt = `
      Payment Successful!
      Unique Number: ${Math.random().toString(36).substring(2, 15)}
      Card Number: ${data.cardNumber}
      Expiry Date: ${data.expiryDate}
      CVV: ${data.cvv}
      Amount: ${price}
      Root Details: ${JSON.stringify(rootDetails)}
    `;
    console.log(receipt);
    // You can replace this with actual printing logic
    alert(receipt);
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
              {...register("cardNumber", {
                required: true,
                pattern: /^\d{16}$/,
              })}
            />
            {errors.cardNumber && (
              <p className="error">
                Card number is required and should be 16 digits
              </p>
            )}
          </div>
          <div className="form-group">
            <input
            placeholder="Expiry Date [mm / yy]"
              type="text"
              {...register("expiryDate", {
                required: true,
                pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
              })}
            />
            {errors.expiryDate && (
              <p className="error">
                Expiry date is required and should be in MM/YY format
              </p>
            )}
          </div>
          <div className="form-group">
            <input
            placeholder="CVV"
              type="text"
              {...register("cvv", {
                required: true,
                pattern: /^[0-9]{3,4}$/,
              })}
            />
            {errors.cvv && (
              <p className="error">CVV is required and should be 3 or 4 digits</p>
            )}
          </div>
          <div className="form-group">
            <input type="text" value={price} readOnly />
          </div>
          <button type="submit" className="final_btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
