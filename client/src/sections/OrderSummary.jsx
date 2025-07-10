import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const OrderSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod] = useState('Cash on Delivery');
  const [isLoading, setIsLoading] = useState(false);

  const items = state?.items || [];

  const itemsTotal = items.reduce((total, item) => {
    const basePrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    const extraCharge = (item.extra ? 2 : 0) + (item.sauce ? 2 : 0);
    return total + (basePrice + extraCharge) * (item.quantity || 1);
  }, 0);

  const codFee = 2;
  const totalPrice = itemsTotal + codFee;

  const handleConfirm = () => {
    if (!customerName || !address || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    const emailParams = {
      customer_name: customerName,
      customer_phone: phone,
      customer_address: address,
      payment_method: paymentMethod,
      total: `$${totalPrice.toFixed(2)}`,
      items: items.map((item, i) => (
        `${i + 1}) ${item.name} x${item.quantity} - Drink: ${item.drink}, Sauce: ${item.sauce || 'None'}, Extra: ${item.extra || 'None'}`
      )).join('\n'),
    };

    emailjs.send(
      'service_8edvd05',          
      'template_tnxv3xe',         
      emailParams,
      '7WkvtQTTkyumR7h4B'         
    )
    .then(() => {
      setIsLoading(false);
      alert("Order Confirmed!");
      navigate('/');
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
      setIsLoading(false);
      alert("Order confirmed");
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-24">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="border p-4 rounded shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.imgURL} alt={item.name} className="w-16 h-16 rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm">Drink: {item.drink}</p>
                  <p className="text-sm">Sauce: {item.sauce || "None"}</p>
                  <p className="text-sm">Extra: {item.extra || "None"}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-green-600 font-semibold">
                  ${((parseFloat(item.price.replace(/[^\d.]/g, '')) || 0) + (item.extra ? 2 : 0) + (item.sauce ? 2 : 0)) * item.quantity}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border rounded p-2 mb-3"
          />
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded p-2 mb-3"
          />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <select
            value={paymentMethod}
            disabled
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          >
            <option>Cash on Delivery</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">+ $2 Cash on Delivery Fee</p>
        </div>

        <div className="mt-6">
          <p className="text-xl font-bold mb-3">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Sending Order...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
