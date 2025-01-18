import React from "react";
import { Link } from "react-router";

const Navbar = ({ links }) => {
  return (
    <div className="z-10 fixed top-0 left-0 w-full bg-white flex flex-col sm:flex-row items-center justify-between p-3 text-sm border-b-2">
      <Link to="/" className="font-bold text-base">
        Coursify
      </Link>
      <div className="flex justify-center items-center gap-1">
        {links.map((link) => {
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`${
                link.isPrimary
                  ? "bg-primary hover:bg-primary-dark border-primary text-white"
                  : "border-2 hover:bg-black/5"
              } py-1 px-3 rounded-md`}
            >
              <p className="px-1 whitespace-nowrap">{link.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
