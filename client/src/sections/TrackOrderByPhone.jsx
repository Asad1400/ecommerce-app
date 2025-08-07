import React, { useState } from "react";

const TrackOrderByPhone = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/order/track-by-phone?phone=${phone}`);
      if (!res.ok) throw new Error("No orders found");
      const data = await res.json();
      setOrders(data);
      setError("");
    } catch (err) {
      setOrders([]);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-4">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Track Your Order</h2>

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-3"
        />
        <button
          onClick={fetchOrders}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
        >
          Track Order
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {orders.length > 0 && (
          <div className="mt-6 space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="p-4 border rounded bg-gray-50">
                <p><strong>Name:</strong> {order.userName}</p>
                <p><strong>Phone:</strong> {order.userPhone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total:</strong> Rs {order.totalPrice}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <h4 className="font-medium mt-2">Items:</h4>
                <ul className="list-disc ml-5">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.itemName} × {item.quantity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderByPhone;
