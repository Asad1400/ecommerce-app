import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";

const banners = [banner1, banner2, banner3, banner4, banner5];

const Signup = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && formData.name && formData.email && formData.password) {
      setStep(2);
    }
  };

  const handleStepClick = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <div className="flex h-screen overflow-hidden font-[sans-serif] bg-black text-white">
      {/* LEFT FORM */}
      <div className="w-full md:w-1/2 h-full bg-black shadow-xl relative flex flex-col items-center justify-center">
        {/* Steps */}
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={() => handleStepClick(1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              step === 1
                ? "bg-orange-500 text-white border-orange-500"
                : "border-orange-400 text-orange-400"
            }`}
          >
            1
          </button>
          <div className="w-12 h-[2px] bg-orange-400"></div>
          <button
            onClick={() => handleStepClick(2)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              step === 2
                ? "bg-orange-500 text-white border-orange-500"
                : "border-orange-400 text-orange-400"
            }`}
          >
            2
          </button>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-sm text-gray-300 mt-1">
              Join <span className="text-orange-500 font-semibold">Click2Eat</span> today!
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleNext}>
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="********"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-md hover:from-orange-600 hover:to-amber-600 transition"
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="********"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 03001234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-200">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your address"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-md hover:from-orange-600 hover:to-amber-600 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </form>

          <p className="text-sm text-center text-gray-400 mt-2 mb-10">
            Already have an account?
            <Link to="/Login">
              <span className="text-orange-500 font-semibold ml-1 hover:underline">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE CONTAINER */}
      <div className="hidden md:flex w-1/2 h-screen bg-black items-center justify-center">
        <div className="relative flex items-center justify-center w-[80%] h-[80%]">
          <img
            src={banners[currentImageIndex]}
            alt="banner"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
