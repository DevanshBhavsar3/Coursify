import React from "react";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const userType = localStorage.getItem("userType");

  const navbarLinks = document.cookie.includes("token")
    ? [
        {
          to: "/" + userType + "/courses",
          text: "All Courses",
          isPrimary: false,
        },
        {
          to: "/logout",
          text: "Logout",
          isPrimary: false,
        },
      ]
    : [
        {
          to: "/users/login",
          text: "Log in",
          isPrimary: false,
        },
        {
          to: "/users/register",
          text: "Register",
          isPrimary: true,
        },
      ];

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Navbar links={navbarLinks} />
      <p className="text-lg font-semibold text-center">404 Not found</p>
    </div>
  );
};

export default NotFound;
