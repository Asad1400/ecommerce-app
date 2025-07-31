import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

  const handleStepClick = (stepNumber) => {
    setStep(stepNumber);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (formData.name && formData.email && formData.password) {
        setStep(2);
      } else {
        alert("Please fill all fields in Step 1");
      }
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("✅ Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-[sans-serif]">
      {/* LEFT FORM */}
      <div className="w-full md:w-1/2 h-full px-[15px] py-[10px] bg-white shadow-xl relative flex flex-col items-center justify-center">
        {/* Step Indicator */}
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

        {/* Form Content */}
        <div className="w-full max-w-md space-y-6 text-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-sm text-gray-500 mt-1">
              Join{" "}
              <span className="text-orange-500 font-semibold">Click2Eat</span>{" "}
              today!
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="********"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., 03001234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
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

          <p className="text-sm text-center text-gray-600 mt-2 mb-10">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-orange-500 font-semibold hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE CONTAINER */}
      <div className="hidden md:block w-1/2 h-full">
        <div className="w-full h-full rounded-xl overflow-hidden p-10">
          <img
            src={banners[currentImageIndex]}
            alt="banner"
            className="object-cover w-[740px] h-full transition-opacity rounded-xl duration-1000"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
