import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const banners = [banner1, banner2, banner3, banner4, banner5];

const Login = ({ onLogin }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // for redirection

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Login successful! Redirecting...");
      if (onLogin) onLogin(user); // ✅ Notify App.jsx of logged-in user
      navigate("/"); // ✅ Redirect to homepage
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden font-[sans-serif]">
      {/* Left Form Side */}
      <div className="w-full md:w-1/2 h-full px-[15px] py-[10px] bg-white shadow-xl relative flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6 text-gray-700 mt-20 mb-10">
          <div className="text-center">
            <FaUserCircle className="text-6xl mx-auto text-amber-500" />
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Welcome Back!</h2>
            <p className="text-sm text-gray-500 mt-1">
              Login to continue to{" "}
              <span className="text-orange-500 font-semibold">Click2Eat</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 mt-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-orange-500" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-md hover:from-orange-600 hover:to-amber-600 transition"
            >
              Sign In
            </button>
          </form>

          {/* Errors */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          <p className="text-sm text-center text-gray-600 mt-2 mb-10">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-orange-500 font-semibold hover:underline cursor-pointer">
                Create an Account
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Banner Image */}
      <div className="hidden md:block w-1/2 h-full">
        <div className="w-full h-full rounded-xl overflow-hidden p-10">
          <img
            src={banners[currentImageIndex]}
            alt="banner"
            className="object-cover w-[700px] h-full transition-opacity rounded-xl duration-1000"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
