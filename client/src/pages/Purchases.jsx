import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

// Icons
import { useNavigate } from "react-router";

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
        .get("https://coursify-backend-chi.vercel.app" + location.pathname, {
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
    <div className="flex flex-col gap-10 px-10 sm:px-20">
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
      <p className="text-lg font-semibold tracking-tight mt-24">
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
