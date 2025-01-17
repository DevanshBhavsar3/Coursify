//  implement the home page UI here.
import React from "react";

// components imports
// import Login from "../components/Login";
// import Register from "../components/Register";
// import Courses from "../components/Courses";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Explore from "../components/Explore";
import Reviews from "../components/Reviews";
import BecomeSeller from "../components/BecomeSeller";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="mx-3 md:mx-32 flex flex-col justify-center items-center gap-20">
        <Navbar />
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
