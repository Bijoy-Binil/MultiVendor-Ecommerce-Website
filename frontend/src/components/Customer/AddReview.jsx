import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const { product_id } = useParams();
  const productId = parseInt(product_id);
  const { accessToken } = useContext(AuthContext);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const baseUrl = "http://127.0.0.1:8000/api/product-rating/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!review || !rating) {
      setMessage("Please provide both review and rating.");
      return;
    }
    if (!accessToken) {
      setMessage("Please login to submit a review.");
      return;
    }
    if (!product_id || isNaN(productId)) {
      setMessage("Invalid product ID.");
      return;
    }

    const numericRating = parseInt(rating);
    if (numericRating < 1 || numericRating > 5) {
      setMessage("Rating must be between 1 and 5.");
      return;
    }

    try {
      await axios.post(
        baseUrl,
        {
          product: productId,
          rating: numericRating,
          reviews: review,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setMessage("Review submitted successfully!");
      setReview("");
      setRating("");
    } catch (err) {
      console.error("Error submitting review:", err.response?.data);
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Error submitting review.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">Add Review</h4>

          {message && (
            <div
              className={`alert ${
                message.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="review" className="form-label">
                Review
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="form-control"
                rows="4"
                placeholder="Write your review..."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-control"
                min="1"
                max="5"
                placeholder="Enter rating"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
