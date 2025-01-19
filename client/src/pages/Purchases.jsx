import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

// Icons
import { Link, useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

const Purchases = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    if (!location.pathname.includes(userType)) {
      navigate("/");
      return;
    }

    try {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + location.pathname, {
          withCredentials: true,
        })
        .then((response) => {
          setCourses(response.data.purchasedCourses);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="flex flex-col px-10 sm:px-20">
      <Navbar
        links={[
          {
            to: "/users/courses",
            text: "All Courses",
            isPrimary: false,
          },
          {
            to: "/logout",
            text: "Log out",
            isPrimary: false,
          },
        ]}
      />
      <Link
        to={"/users/courses"}
        className="flex items-center justify-start gap-3 top-3 left-3 mt-24"
      >
        <FaArrowLeftLong />
        <p className="text-base">All Courses</p>
      </Link>
      <p className="text-lg font-semibold tracking-tight mb-10">
        Your Purchases
      </p>
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            imageURL={course.imageLink}
            title={course.title}
            price=""
            description={course.description}
            creator={course.creatorId.username}
            isBought={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Purchases;
