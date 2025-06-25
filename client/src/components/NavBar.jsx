import React from "react";
import logo from "../assets/Logo.png";
import { FaUser, FaHome, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaBurger } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent px-10 py-4">
      <div className="flex items-center justify-between">
        {/* Logo on the left */}
        <div>
          <img src={logo} alt="Click2Eat" className="h-[20%] w-[20%]" />
        </div>

        {/* Right-side Nav Items including user icon */}
        <div className="flex items-center space-x-6 font-bold text-white">
          <ul className="flex space-x-6">
            {[
              { icon: <FaHome />, label: "Home" },
              { icon: <FaSearch />, label: "Search" },
              { icon: <FaShoppingCart />, label: "Cart", id: "cart-icon" },
              { icon: <FaBurger />, label: "Burger" },
            ].map((item, index) => (
              <li key={index} className="relative group" id={item.label === "Cart" ? "cart-icon" : undefined}>
                <div className="flex items-center justify-center h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <span className="absolute inset-0 border-2 border-orange-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></span>
                  <span className="z-10 text-2xl text-white group-hover:text-orange-500 transition">
                    {item.icon}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* User Icon */}
          <div className="relative group">
            <div className="flex items-center justify-center h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <span className="absolute inset-0 border-2 border-orange-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></span>
              <FaUser className="z-10 text-2xl text-white group-hover:text-orange-500 transition" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;