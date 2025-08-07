import logo from "../assets/Logo.png";
import { FaUser, FaHome, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaBurger } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AddToCart from "../sections/AddToCart";
import SearchModal from "../components/SearchModal";
import { burgers, wraps, familydeal } from "../constants/index";
import React, {useState, useRef, useEffect } from "react";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Navbar = ({ cartItems, setCartItems, user }) => {
  const profileMenuRef = useRef(null);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
  const closeMenu = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setShowProfileMenu(false);
    }
  };

  document.addEventListener("mousedown", closeMenu);
  window.addEventListener("scroll", () => setShowProfileMenu(false));

  return () => {
    document.removeEventListener("mousedown", closeMenu);
    window.removeEventListener("scroll", () => setShowProfileMenu(false));
  };
}, []);

  const navItems = [
    { icon: <FaHome />, label: "Home", to: "/" },
    {
      icon: <FaSearch />,
      label: "Search",
      onClick: () => setShowSearch((prev) => !prev),
    },
    {
      icon: <FaShoppingCart />,
      label: "Cart",
      id: "cart-icon",
      onClick: () => setShowCart((prev) => !prev),
    },
    {
      icon: <FaBurger />,
      label: "Burger",
      onClick: () => scrollToSection("burgers"),
    },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 bg-transparent px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div>
              <img src={logo} alt="Click2Eat" className="h-[20%] w-[20%]" />
            </div>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center space-x-6 font-bold text-white">
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="relative group"
                  id={item.id}
                  onClick={item.onClick}
                >
                  {item.to ? (
                    <Link to={item.to}>
                      <div className="flex items-center justify-center h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <span className="absolute inset-0 border-2 border-orange-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></span>
                        <span className="z-10 text-2xl text-white group-hover:text-orange-500 transition">
                          {item.icon}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <span className="absolute inset-0 border-2 border-orange-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></span>
                      <span className="z-10 text-2xl text-white group-hover:text-orange-500 transition">
                        {item.icon}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Profile Dropdown */}
<div className="relative">
  <div
    onClick={() => setShowProfileMenu((prev) => !prev)}
    className="flex items-center justify-center h-10 w-10 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-12"
  >
    <FaUser className="text-2xl text-white hover:text-orange-500 transition" />
  </div>

  {showProfileMenu && (
    <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
      {user ? (
        <>
          <div className="px-4 py-2 border-b font-semibold text-orange-500">
            {user.name}
          </div>
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-orange-100"
            onClick={() => setShowProfileMenu(false)}
          >
            Profile
          </Link>
          <Link to="/track-order" className="px-4 py-2 hover:bg-orange-100">
              Track Order
          </Link>

          <Link
            to="/order-history"
            className="block px-4 py-2 hover:bg-orange-100"
            onClick={() => setShowProfileMenu(false)}
          >
            Order History
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="w-full text-left px-4 py-2 hover:bg-orange-100"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/signup"
          className="block px-4 py-2 hover:bg-orange-100"
          onClick={() => setShowProfileMenu(false)}
        >
          Signup
        </Link>
      )}
    </div>
  )}
</div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <AddToCart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
      />

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        items={[...burgers, ...wraps, ...familydeal]}
        onAddToCart={(item) => {
          setCartItems((prev) => [...prev, item]);
          setShowSearch(false); // Close modal after adding
        }}
      />

      <Outlet />
    </>
  );
};

export default Navbar;
