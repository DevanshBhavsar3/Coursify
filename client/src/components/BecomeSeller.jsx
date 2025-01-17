import React from "react";
import { Link } from "react-router";

const BecomeSeller = () => {
  return (
    <div className="font-primary flex justify-between items-center gap-2 bg-slate-100 rounded-md p-5 py-20 self-start w-full mb-20">
      <div className="font-medium flex flex-col items-start justify-center">
        <p className="text-lg mb-5">Want to become a seller?</p>
        <p className="text-base mb-2">
          Join the Coursify Community of Expert Instructors and{" "}
          <br className="hidden lg:block" /> connect with a network of talented
          educators
        </p>
        <Link
          to="/seller/register"
          className="bg-primary hover:bg-primary-dark text-white p-2 rounded-md px-3"
        >
          <p className="px-1 text-sm">Become a seller</p>
        </Link>
      </div>
      <img
        src="/growth.svg"
        className="hidden lg:block h-52 scale-125 mr-32"
      ></img>
    </div>
  );
};

export default BecomeSeller;
