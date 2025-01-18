import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Explore from "../components/Explore";
import Reviews from "../components/Reviews";
import BecomeSeller from "../components/BecomeSeller";
import Footer from "../components/Footer";

const Home = () => {
  const userType = localStorage.getItem("userType");

  const navbarLinks = document.cookie.includes("token")
    ? [
        // TODO
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
    <>
      <div className="mx-3 md:mx-32 flex flex-col justify-center items-center gap-20">
        <Navbar links={navbarLinks} />
        <Hero />
        <Explore />
        <Reviews />
        <BecomeSeller />
      </div>
      <Footer />
    </>
  );
};

export default Home;
