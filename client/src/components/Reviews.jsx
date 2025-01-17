import React from "react";
import Profile from "./Profile";

const Reviews = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 ">
      <p className="text-md font-medium self-start">
        Join Our Community of Learners.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <Profile
          imageURL="/profile1.svg"
          name="Mark S."
          role="Marketing Manager"
          company="100x Labs"
          review="Coursify makes it so easy to find the perfect online course."
        />
        <Profile
          imageURL="/profile2.svg"
          name="Sarah J."
          role="Software Engineer"
          company="Machina Code"
          review="I love the intuitive design of Coursify. The website is a breeze to navigate, and I can easily track my progress across different courses."
        />
        <Profile
          imageURL="/profile3.svg"
          name="David L."
          role="Project Manager"
          company="Hypergrowth Developers"
          review="Coursify offers a fantastic selection of high-quality courses from top instructors."
        />
        <Profile
          imageURL="/profile4.svg"
          name="Emily S."
          role="HR Manager"
          company="Code Ascent"
          review="The platform is user-friendly, affordable, and the courses are engaging and informative."
        />
      </div>
    </div>
  );
};

export default Reviews;
