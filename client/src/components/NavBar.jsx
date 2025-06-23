import React from "react";
import logo from "../assets/Logo.png";
import { FaUser } from "react-icons/fa"; 

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent px-10 py-4">
      <div className="grid grid-cols-3 items-center">
        {/* Logo on the left */}
        <div>
          <img src={logo} alt="Click2Eat" className="h-[30%] w-[39%]" />
        </div>

        {/* Centered Nav Items */}
        <div className="flex justify-center font-bold text-white">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#"
                className="relative hover:text-orange-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative hover:text-orange-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative hover:text-orange-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative hover:text-orange-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right-side Icon/Button */}
          <div className="flex justify-end">
            <a
              href="/Login"
              className="flex items-center gap-2 px-4 py-2 text-white font-medium hover:text-orange-500 transition"
            >
              <FaUser className="text-lg" />
              Login
            </a>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
