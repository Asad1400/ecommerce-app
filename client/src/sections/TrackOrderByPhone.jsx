import { useState } from "react";
import { FaArrowLeft, FaSearch, FaShoppingBag, FaBoxOpen, FaCheckCircle, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setErrorMsg("⚠ Please enter a valid Order ID.");
      setOrder(null);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setOrder(null);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        throw new Error("User not found in localStorage");
      }

      const res = await fetch(`http://localhost:5000/orders/user/${user._id}`);
      const data = await res.json();

      const foundOrder = data.find((o) => o._id === orderId.trim());
      if (!foundOrder) {
        throw new Error("❌ Order not found");
      }

      setOrder(foundOrder);
    } catch (err) {
      setErrorMsg(err.message || "Error fetching order.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-white flex items-center justify-center py-20 px-4 font-[sans-serif]">
      <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 relative border border-orange-200">

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-5 left-5 flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-semibold transition"
        >
          <FaArrowLeft /> Back
        </Link>

        {/* Heading */}
        <div className="text-center mb-10 mt-4">
          <div className="flex items-center justify-center gap-3 text-orange-500">
            <FaShoppingBag className="text-4xl" />
            <h2 className="text-3xl font-bold text-gray-800">Track Your Order</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">Enter your Order ID below to see its details</p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="🔍 Enter Order ID..."
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
          <button
            onClick={handleTrackOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <FaSearch /> Track
          </button>
        </div>

        {/* Messages */}
        {loading && <p className="text-center text-gray-500">⏳ Fetching your order...</p>}
        {errorMsg && <p className="text-center text-red-500 font-medium">{errorMsg}</p>}

        {/* Order Details */}
        {order && (
          <div className="bg-gradient-to-br from-white to-orange-50 border border-orange-200 rounded-xl p-6 shadow-lg mt-4">
            {/* Order Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-orange-500" />
                <span className="text-sm font-semibold">Order ID:</span>
                <span className="text-sm text-gray-700">{order._id}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span className="text-sm font-semibold">Order Date:</span>
                <span className="text-sm text-gray-700">{formatDate(order.orderDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-500" />
                <span className="text-sm font-semibold">Customer:</span>
                <span className="text-sm text-gray-700">{order.userName || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-sm font-semibold">Address:</span>
                <span className="text-sm text-gray-700">{order.address || "N/A"}</span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Items:</h3>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1 border-b last:border-none">
                    <span>{item.itemName} × {item.quantity}</span>
                    <span className="font-medium">Rs {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right mt-2">
              <span className="text-lg font-bold text-orange-600">
                Total: Rs {order.totalPrice}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
