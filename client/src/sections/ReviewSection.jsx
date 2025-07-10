import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const newEntry = { ...newReview, id: Date.now() };
      setReviews([newEntry, ...reviews]);
      setNewReview({ name: '', comment: '', rating: 5 });
    }
  };

  return (
    <section className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-red-700">What Our Customers Say</h2>

      {/* Add Review Form */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Write your review..."
            className="w-full p-2 border rounded"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-xl ${
                    newReview.rating >= star ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded shadow-md border">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-red-700">{review.name}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-sm ${
                        review.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
