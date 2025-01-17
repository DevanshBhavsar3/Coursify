import React from "react";
import Card from "./Card";

const Explore = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-md font-medium self-start">Explore Courses</p>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <Card
          imageURL="/course1.svg"
          title="Intro to Digital Marketing"
          creator="Mark Jacobs"
        />
        <Card
          imageURL="/course2.svg"
          title="Learn to Code with Python"
          creator="Dr. Sarah Lee"
        />
        <Card
          imageURL="/course3.svg"
          title="Spanish for Beginners"
          creator="Professor Juan Garcia"
        />
        <Card
          imageURL="/course4.svg"
          title="Web Development with React"
          creator="Hkirat"
        />
      </div>
    </div>
  );
};

export default Explore;
