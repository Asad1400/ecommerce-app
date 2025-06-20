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
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-20 h-20">
              <img src={facebook} alt="Facebook" className="w-10 h-10" />
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-20 h-20">
              <img src={ig} alt="Instagram" className="w-10 h-10" />
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-20 h-20">
              <img src={X} alt="Twitter/X" className="w-10 h-10" />
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

      {/* <div className="flex w-full flex-row">
        <div className="p-4 text-sm">This is Australia acknowledges the Aboriginal and Torres Strait Islander 
        peoples as the first inhabitants and the Traditional Custodians of the lands where we live, learn and work.
        </div>
      </div> */}

      <div className="flex w-full flex-ro mt-20">

        <div className="w-1/2  p-4 flex-col">
            <div className="font-bold mb-9">Our Menu</div>
            <div>New in</div>
            <div>Deals</div>
            <div>All products</div>
        </div>

        <div className="w-1/2  p-4">
           
           <div className="font-bold mb-9">Happy Land</div>
            <div>New in</div>
            <div>Deals</div>
            <div>All products</div>
        </div>
        <div className="w-1/2  p-4">
           
            <div className="font-bold mb-9"> Careers</div>
            <div>New in</div>
            <div>Deals</div>
            <div>All products</div>
        </div>
        <div className="w-1/2  p-4">
            
            <div className="font-bold mb-9">Help & Support</div>
            <div>New in</div>
            <div>Deals</div>
            <div>All products</div>
        </div>
        
        <div className="w-1/2  p-4">
          
          <div className="font-bold mb-9">About Us</div>
            <div>New in</div>
            <div>Deals</div>
            <div>All products</div>
        </div>
        
        
      </div>

      

    </footer>
  );
};

export default Footer;
