import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/Logo.png";

const HomePage = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center bg-custom-bg bg-cover bg-no-repeat bg-center md:px-20 px-9 md:py-10 py-7">
        {/* ======================================================================================= */}
        {/* Main Section */}
        <div className="md:w-3/4 w-5/6 flex flex-col gap-6 justify-center items-center text-center">
          <img src={Image} alt="" className="h-32 w-32" />
          <h1 className="flex flex-col text-white ">
            <span className="md:text-7xl text-5xl font-bold leading-tight">
              MERN <span className="text-teal-400">CRUD</span>
            </span>
            <span className="text-4xl font-semibold">APPLICATION</span>
            <span className="text-xl font-medium mt-3 text-teal-400">
              With Real-time Search and Category Filtering Options
            </span>
          </h1>

          <p className="text-white text-base">
            Simplify data management. Effortlessly create, update, and manage
            your records, while leveraging search and filtering functionalities
            to find exactly what you need. Enjoy a seamless experience with an
            user-friendly interface and a reliable backend that ensures smooth
            performance at every step.
          </p>

          <Link to="/main">
            <button className="text-2xl bg-teal-600 text-white font-medium border-[1px] border-teal-500 rounded-[5px] px-12 py-4 hover:text-white hover:border-teal-500 hover:bg-teal-500 transition-all ease-in-out duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
