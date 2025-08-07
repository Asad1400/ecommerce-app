import { useEffect, useState } from "react";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        console.error("User not found in localStorage");
        return;
      }

      const res = await fetch(`http://localhost:5000/orders/user/${user._id}`);
      const data = await res.json();

      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching order history:", err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  return (
    <div className="w-screen min-h-screen overflow-y-auto bg-gradient-to-br from-orange-100 via-amber-100 to-white flex items-center justify-center font-[sans-serif] py-20 px-4">
      <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl p-10 relative border border-orange-200">
        <Link
          to="/"
          className="absolute top-5 left-5 flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-semibold transition"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="text-center mb-10 mt-4">
          <div className="flex items-center justify-center gap-3 text-orange-500">
            <FaShoppingBag className="text-3xl" />
            <h2 className="text-3xl font-bold text-gray-800">Order History</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">Your recent food orders</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-gray-400">Order ID:</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {order._id}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {item.itemName} × {item.quantity}
                    </span>
                    <span>Rs {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="text-right">
                  <span className="text-lg font-bold text-orange-600">
                    Total: Rs {order.totalPrice}
                </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
