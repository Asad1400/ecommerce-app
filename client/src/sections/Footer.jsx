  import React from "react";
  import facebook from "../assets/icons/facebook.svg"
  import ig from "../assets/icons/instagram.svg"
  import X from "../assets/icons/twitter.svg"

  const Footer = () => {
    return (
      <footer>
        <div class="flex flex-col w-full">
          <div class="flex w-full">
            <div class="w-1/2 bg-red-300 p-4">Child 1</div>
            <div class="w-1/2 bg-green-300 p-4">Child 2</div>
          </div>

          <div class="w-full bg-blue-300 p-4 mt-4">
            <div className="flex flex-col">
              <h1 className="font-bold">i’m lovin’ it®</h1>
              <p className="font-semibold">Get shoes ready for the new term at your nearest Nike store. Find Your perfect Size In Store. Get Rewards
              </p>

            </div>

            <div className="flex flex-row">
              <div className="flex justify-center  bg-gray-700 rounded-full w-10 h-10">
              <img src={facebook} alt=""/>
              </div>
              <div  className="flex justify-center  bg-gray-700 rounded-full w-10 h-10">
                <img src={ig} alt="" />
              </div>
              
              <div  className="flex justify-center  bg-gray-700 rounded-full w-10 h-10">
                <img src={X} alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
