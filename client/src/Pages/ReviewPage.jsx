import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/review.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImage from "../assets/users.jpg"; // Correctly import the image

const ReviewPage = ({userRole}) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getReviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === reviews.length - 1 ? 0 : prevPage + 1
    );
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      setNewReview((prevReview) => ({
        ...prevReview,
        [name]: parseInt(value),
      }));
    } else {
      setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/createReview",
        newReview
      );
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewReview({
        name: "",
        rating: "",
      });
      toast.success("Review added Successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to add review");
    }
  };

  return (
    <section className="reviews">
      <ToastContainer />
      <div className="text1">Valuable Thoughts From Users</div>

      <div className="review-container">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="review-box"
            style={{ transform: `translateX(-${currentPage * 112.8}%)` }}
          >
            <img src={userImage} alt="Reviewer" />
            <h3>{review.name}</h3>
            <div className="rating_2">
              {[...Array(review.rating)].map((_, index) => (
                <span key={index} className="star_2">
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {userRole && (

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="review-inputs">
          <div className="sub10">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={newReview.name}
              onChange={handleChange}
              required
            />
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < newReview.rating ? "star filled" : "star"}
                  onClick={() =>
                    handleChange({
                      target: { name: "rating", value: index + 1 },
                    })
                  }
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div className="sub2">
            <button type="submit" className="rate">Rate Here</button>
          </div>
        </div>
      </form>
      )}
    </section>
  );
};

export default ReviewPage;
