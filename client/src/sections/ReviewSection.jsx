import React, { useState } from "react";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 5 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const newEntry = { ...newReview, id: Date.now() };
      setReviews([newEntry, ...reviews]);
      setNewReview({ name: "", comment: "", rating: 5 });
    }
  };

  // Dynamic settings based on review count
  const slidesToShowCount = Math.min(reviews.length, 3);
  const settings = {
    dots: true,
    infinite: reviews.length > slidesToShowCount,
    slidesToShow: slidesToShowCount === 0 ? 1 : slidesToShowCount,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(reviews.length, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="my-12 px-4 max-w-3xl mx-auto ">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-yellow-500 tracking-wide">
         What Our Customers Say
      </h2>

      <div className="bg-yellow-300 p-6 rounded-xl shadow-lg mb-12 border border-yellow-200">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Leave a Review</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              required
              className="peer w-full px-3 pt-5 pb-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-transparent"
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-red-500"
            >
              Your Name
            </label>
          </div>

          <div className="relative">
            <textarea
              id="comment"
              rows={3}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
              className="peer w-full px-3 pt-5 pb-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-transparent"
              placeholder="Write your review..."
            />
            <label
              htmlFor="comment"
              className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-red-500"
            >
              Write your review...
            </label>
          </div>

          <div className="flex items-center gap-3 " >
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

          {/* Submit */}
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:shadow-lg active:scale-95 transition-all"
          >
           Submit Review
          </button>
        </form>
      </div>

      {/* Reviews Section */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No reviews yet. Be the first to leave one!
        </p>
      ) : reviews.length < 3 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl text-red-500 mb-4">
                <FaQuoteLeft />
              </div>
              <p className="mb-6 text-gray-700 text-base italic leading-relaxed">
                “{review.comment}”
              </p>
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
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl text-red-500 mb-4 group-hover:scale-110 transition-transform">
                  <FaQuoteLeft />
                </div>
                <p className="mb-6 text-gray-700 text-base italic leading-relaxed">
                  “{review.comment}”
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-5xl text-gray-400 group-hover:text-red-500 transition-colors">
                    <FaUserCircle />
                  </div>
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
