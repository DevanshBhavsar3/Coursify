import React from "react";
import { Link } from "react-router";

// Icons
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="font-primary bg-primary text-white flex justify-between items-center p-5">
      &copy; 2025 Courisfy
      <Link
        to="https://github.com/DevanshBhavsar3/Coursify.git"
        target="_blank"
        className="flex justify-center items-center gap-3 p-3 rounded-md"
      >
        <FaGithub />
        <p>Github</p>
      </Link>
    </div>
  );
};

export default Footer;
