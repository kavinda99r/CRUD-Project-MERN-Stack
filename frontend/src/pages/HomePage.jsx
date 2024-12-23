import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="">
          <Link to="/main">
            <button className="text-2xl text-slate-900 font-medium border-[1px] border-slate-700 rounded-[5px] px-12 py-4 hover:text-white hover:border-teal-500 hover:bg-teal-500 transition-all ease-in-out duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
