import React from "react";
import facebook from "../assets/icons/facebook.svg";
import ig from "../assets/icons/instagram.svg";
import X from "../assets/icons/twitter.svg";

const Footer = () => {
  return (
    <footer className="max-container text-white bg-black">
      <div className="flex flex-row w-full">

        <div className="w-1/2 bg-white-300 p-4 mt-4">
          <div className="flex flex-col space-y-4">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl">
              i’m lovin’ it®
            </h1>
            
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12">
              <img src={facebook} alt="Facebook" className="w-7 h-7" />
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12">
              <img src={ig} alt="Instagram" className="w-7 h-7" />
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12">
              <img src={X} alt="Twitter/X" className="w-7 h-7" />
            </div>
          </div>
        </div>

        <div className="w-1/2 ml-25">

          <p className="font-bold text-gray-100 text-4xl mt-12">
              Order, Earn, Enjoy
          </p>
          <p className="font-bold text-gray-100 text-2xl mt-2">
            Download Our App
          </p>
          <p className="text-gray-400 mr-20 mt-7 text-sm ">
            Apple and the Apple logo are trade marks of Apple Inc., registered in the U.S. and other countries.
             App Store is a service mark of Apple Inc., registered in the U.S. and other countries. 
            Google Play and the Google Play logo are trade marks of Google LLC.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-ro mt-20">

        <div className="w-1/2  p-4 flex-col">
            <div className="font-bold mb-9">Our Menu</div>
            <div className="font-thin">New in</div>
            <div className="font-thin">Deals</div>
            <div className="font-thin">All products</div>
        </div>

        <div className="w-1/2  p-4">
           
           <div className="font-bold mb-9">Happy Land</div>
            <div className="font-thin">New in</div>
            <div className="font-thin">Deals</div>
            <div className="font-thin">All products</div>
        </div>
        <div className="w-1/2  p-4">
           
            <div className="font-bold mb-9"> Careers</div>
            <div className="font-thin">New in</div>
            <div className="font-thin">Deals</div>
            <div className="font-thin">All products</div>
        </div>
        <div className="w-1/2  p-4">
            
            <div className="font-bold mb-9">Help & Support</div>
            <div className="font-thin">New in</div>
            <div className="font-thin">Deals</div>
            <div className="font-thin">All products</div>
        </div>
        
        <div className="w-1/2  p-4">
          
          <div className="font-bold mb-9">About Us</div>
            <div className="font-thin">New in</div>
            <div className="font-thin">Deals</div>
            <div className="font-thin">All products</div>
        </div>
        
        
      </div>

      <div className="flex w-full justify-between flex-ro mt-20">

        <div className="p-4">
            Copyright. All rights reserved.
        </div>

        <div className="p-4 mr-24">
           Terms and Conditions
        </div>
      </div>



      

    </footer>
  );
};

export default Footer;
