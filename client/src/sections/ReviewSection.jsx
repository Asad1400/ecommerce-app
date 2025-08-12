import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 5 });

  useEffect(() => {
    axios.get("http://localhost:5000/reviews")
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      try {
        const res = await axios.post("http://localhost:5000/reviews", newReview);
        setReviews([res.data, ...reviews]);
        setNewReview({ name: "", comment: "", rating: 5 });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const slidesToShowCount = Math.min(reviews.length, 3);
  const settings = {
    dots: true,
    infinite: reviews.length > slidesToShowCount,
    slidesToShow: slidesToShowCount || 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(reviews.length, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="my-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 tracking-wide">
        What Our Customers Say
      </h2>

      {/* Review Form */}
      <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 p-6 rounded-2xl shadow-lg mb-14 border border-yellow-300">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Leave a Review</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>

          <div>
            <textarea
              rows={3}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
              placeholder="Write your review..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium">Rating:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl transition-transform ${
                    newReview.rating >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>

      {/* Reviews Section */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No reviews yet. Be the first to leave one!</p>
      ) : reviews.length < 3 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <FaQuoteLeft className="text-4xl text-red-500 mb-4" />
              <p className="mb-6 text-gray-700 italic leading-relaxed">“{review.comment}”</p>
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-5xl text-gray-400" />
                <div>
                  <h1 className="text-lg font-bold text-gray-800">{review.name}</h1>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-base ${
                          review.rating >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-2">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-transform">
                <FaQuoteLeft className="text-4xl text-red-500 mb-4" />
                <p className="mb-6 text-gray-700 italic leading-relaxed">“{review.comment}”</p>
                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-5xl text-gray-400" />
                  <div>
                    <h1 className="text-lg font-bold text-gray-800">{review.name}</h1>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`text-base ${
                            review.rating >= star ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default ReviewSection;
