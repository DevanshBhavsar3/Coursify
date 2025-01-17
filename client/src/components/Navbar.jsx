import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="z-10 fixed top-0 left-0 w-full bg-white flex items-center justify-between p-3 text-sm border-b-2">
      <p className="font-bold text-base">Coursify</p>
      <div className="flex justify-center items-center gap-1">
        {document.cookie.includes("token") ? (
          <>
            <Link
              to="courses"
              className="border-2 hover:bg-black/5 py-1 px-3 rounded-md"
            >
              <p className="px-1">Go to Courses</p>
            </Link>
            {/* TODO: add logout functionality */}
            <button className="border-2 hover:bg-black/5 py-1 px-3 rounded-md">
              <p className="px-1">Log Out</p>
            </button>
          </>
        ) : (
          <>
            <Link
              to="users/login"
              className="border-2 hover:bg-black/5 py-1 px-3 rounded-md"
            >
              <p className="px-1">Login</p>
            </Link>
            <Link
              to="users/register"
              className="bg-primary hover:bg-primary-dark border-2 border-primary text-white py-1 px-3 rounded-md"
            >
              <p className="px-1">Register</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
