import React, { useState, useEffect } from "react";
import "../styles/profileModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import users from "../assets/users.jpg";

const ProfileModal2 = ({ show, onClose, userDetails }) => {
  const navigate = useNavigate();
  const [idFrontImage, setIdFrontImage] = useState(null);
  const [idBackImage, setIdBackImage] = useState(null);
  const [busImage, setBusImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(users);
  const [imagePreview1, setImagePreview1] = useState(users);
  const [imagePreview2, setImagePreview2] = useState(users);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    idNumber: "",
    busNumber: "",
    chasisNumber: "",
    password: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        username: userDetails.username,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
        idNumber: userDetails.idNumber,
        busNumber: userDetails.busNumber,
        chasisNumber: userDetails.chasisNumber,
        password: "",
      });
      setImagePreview(userDetails.idFrontImage || users);
      setImagePreview1(userDetails.idBackImage || users);
      setImagePreview2(userDetails.busImage || users);
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      if (name === "idFrontImage") {
        setIdFrontImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
      if (name === "idBackImage") {
        setIdBackImage(file);
        setImagePreview1(URL.createObjectURL(file));
      }
      if (name === "busImage") {
        setBusImage(file);
        setImagePreview2(URL.createObjectURL(file));
      }
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let idFrontImageUrl = userDetails.idFrontImage || "";
      let idBackImageUrl = userDetails.idBackImage || "";
      let busImageUrl = userDetails.busImage || "";

      if (idFrontImage || idBackImage || busImage) {
        const uploadFormData = new FormData();
        if (idFrontImage) uploadFormData.append("idFrontImage", idFrontImage);
        if (idBackImage) uploadFormData.append("idBackImage", idBackImage);
        if (busImage) uploadFormData.append("busImage", busImage);
        const uploadResponse = await axios.post(
          "http://localhost:3001/upload",
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        idFrontImageUrl = uploadResponse.data.idFrontImage || idFrontImageUrl;
        idBackImageUrl = uploadResponse.data.idBackImage || idBackImageUrl;
        busImageUrl = uploadResponse.data.busImage || busImageUrl;
      }

      // Prepare data to update
      const updatedData = {
        email: formData.email,
        password: formData.password,
        idFrontImage: idFrontImageUrl,
        idBackImage: idBackImageUrl,
        busImage: busImageUrl,
        username: formData.username,
        phone: formData.phone,
        address: formData.address,
        idNumber: formData.idNumber,
        chasisNumber: formData.chasisNumber,
        busNumber: formData.busNumber,
      };

      // Update user profile only if any field has been updated
      const hasChanged = Object.keys(updatedData).some(
        (key) => updatedData[key] !== userDetails[key]
      );

      if (hasChanged) {
        const updateResponse = await axios.put(
          "http://localhost:3001/auth/updateRootBus",
          updatedData
        );

        toast.success("Successfully updated!");
        setTimeout(() => {
          onClose(); // Close the modal
          window.location.reload();
        }, 1000);

        console.log(updateResponse.data); // Handle the response as needed
      } else {
        toast.info("No changes to update.");
      }
    } catch (error) {
      toast.error("Error updating profile");

      console.error("Error updating profile:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <ToastContainer position="top-right" />

      <div className="modal-content_6">
        <div className="cards">
          <h2>Update Profile</h2>
          <button className="cancel_button_2" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="update_profile_section">
            <img src={imagePreview} alt="ID Front" />
            <label htmlFor="id_front">Add New Front ID Image</label>
          </div>
          <input
            id="id_front"
            className="profile-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="idFrontImage"
          />
          <div className="update_profile_section">
            <img src={imagePreview1} alt="ID Back" />
            <label htmlFor="id_back">Add New Back ID Image</label>
          </div>
          <input
            id="id_back"
            className="profile-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="idBackImage"
          />
          <div className="update_profile_section">
            <img src={imagePreview2} alt="Bus Image" />
            <label htmlFor="bus_image">Add New Bus=Image</label>
          </div>
          <input
            id="bus_image"
            className="profile-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="busImage"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
          <input type="email" name="email" value={formData.email} readOnly />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="busNumber"
            value={formData.busNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="chasisNumber"
            value={formData.chasisNumber}
            onChange={handleChange}
          />

          <button type="submit" className="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal2;
