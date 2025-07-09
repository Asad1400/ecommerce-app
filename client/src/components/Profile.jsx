import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaSave, FaGoogle } from "react-icons/fa";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";

const banners = [banner1, banner2, banner3, banner4, banner5];

const Profile = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "03001234567",
    address: "123 Main Street, Lahore",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here (e.g., API call)
    console.log("Saved:", profileData);
  };

  return (
    <div className="h-screen flex overflow-hidden font-[sans-serif]">
      {/* Left side - Profile Form */}
      <div className="w-full md:w-1/2 h-full px-[15px] py-[10px] bg-white shadow-xl relative flex flex-col items-center justify-center">
        <button className="absolute top-6 left-6 flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-semibold transition duration-300">
          <FaArrowLeft />
          Back to Home
        </button>

        <div className="w-full max-w-md space-y-6 text-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your profile details</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none ${
                  isEditing ? "focus:ring-2 focus:ring-amber-500" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none ${
                  isEditing ? "focus:ring-2 focus:ring-amber-500" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none ${
                  isEditing ? "focus:ring-2 focus:ring-amber-500" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="flex justify-between items-center mt-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700"
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-md hover:from-orange-600 hover:to-amber-600 transition"
                >
                  <FaSave className="inline mr-2" />
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image Slideshow */}
      <div className="hidden md:block w-1/2 h-full">
        <div className="w-full h-full rounded-xl overflow-hidden p-10">
          <img
            src={banners[currentImageIndex]}
            alt="banner"
            className="object-cover w-full h-full transition-opacity rounded-xl duration-1000"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
