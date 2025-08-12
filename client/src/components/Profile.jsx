import { useState, useEffect } from "react";
import { FaArrowLeft, FaEdit, FaSave, FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          phone: profileData.phone,
          address: profileData.address,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      console.log("Profile updated:", data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Fetch user profile on load
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch user data");
        }
        console.log("Fetched profile data:", data);
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-y-auto bg-gradient-to-br from-orange-100 via-amber-100 to-white flex items-center justify-center font-[sans-serif] py-20 px-4">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl p-10 relative border border-orange-200">
        <Link
          to="/"
          className="absolute top-5 left-5 flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-semibold transition"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="text-center mb-8 mt-4">
          <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={`https://ui-avatars.com/api/?name=${profileData.name}&background=FFA500&color=fff&size=512`}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <FaCamera className="text-white text-lg" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">My Profile</h2>
          <p className="text-sm text-gray-500">Manage your account details</p>
        </div>

        <div className="space-y-5">
          {[ 
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email", disabled: true },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={profileData[field.name]}
                onChange={handleChange}
                disabled={field.disabled || !isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none transition ${
                  field.disabled || !isEditing
                    ? "bg-gray-100 cursor-not-allowed"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
            </div>
          ))}

          <div className="flex justify-end pt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-orange-400 text-orange-600 font-medium rounded-xl hover:bg-orange-50 transition"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition"
              >
                <FaSave />
                Save Changes
              </button>
            )}
          </div>

          <div className="flex justify-between pt-8 gap-4">
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-100 border border-red-400 text-red-800 font-semibold rounded-xl hover:bg-red-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
