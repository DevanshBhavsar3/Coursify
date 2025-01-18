import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { z } from "zod";

// Icons
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { MdCancel } from "react-icons/md";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState("");

  const [title, setTitle] = useState("");
  const [isInvalidTitle, setIsInvalidTitle] = useState("");

  const [description, setDescription] = useState("");
  const [isInvalidDescription, setIsInvalidDescription] = useState("");

  const [price, setPrice] = useState(100);
  const [isInvalidPrice, setIsInvalidPrice] = useState("");

  const [isPublished, setIsPublished] = useState(true);

  const [thumbnail, setThumbnail] = useState("");
  const [isInvalidThumbnail, setIsInvalidThumbnail] = useState("");

  const [inputPopupVisibility, setInputPopupVisibility] = useState(false);

  const userType = localStorage.getItem("userType");

  const navbarLinks =
    userType === "users"
      ? [
          {
            to: "/users/purchasedCourses",
            text: "Purchases",
            isPrimary: false,
          },
          {
            to: "/logout",
            text: "Log out",
            isPrimary: false,
          },
        ]
      : [
          {
            to: "/logout",
            text: "Log out",
            isPrimary: false,
          },
        ];

  useEffect(() => {
    if (!location.pathname.includes(userType)) {
      navigate("/");
      return;
    }

    try {
      axios
        .get("http://localhost:3000" + location.pathname, {
          withCredentials: true,
        })
        .then((response) => {
          setCourses(response.data.courses);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function validateInputs() {
    const requiredTitle = z.string().min(3).max(30);
    const requiredDescription = z.string().min(3).max(100);
    const requiredPrice = z.number().min(100).max(10000);
    const requiredThumbnail = z.string().url();

    const parsedTitle = requiredTitle.safeParse(title);
    const parsedDescription = requiredDescription.safeParse(description);
    const parsedPrice = requiredPrice.safeParse(price);
    const parsedThumbnail = requiredThumbnail.safeParse(thumbnail);

    if (!parsedTitle.success) {
      setIsInvalidTitle(parsedTitle.error.issues[0].message);
      return false;
    } else {
      setIsInvalidTitle("");
    }

    if (!parsedDescription.success) {
      setIsInvalidDescription(parsedDescription.error.issues[0].message);
      return false;
    } else {
      setIsInvalidDescription("");
    }

    if (!parsedPrice.success) {
      setIsInvalidPrice(parsedPrice.error.issues[0].message);
      return false;
    } else {
      setIsInvalidPrice("");
    }

    if (!parsedThumbnail.success) {
      setIsInvalidThumbnail(parsedThumbnail.error.issues[0].message);
      return false;
    } else {
      setIsInvalidThumbnail("");
    }

    return true;
  }

  async function handlePublish(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000" + location.pathname,
        {
          title,
          description,
          price,
          imageLink: thumbnail,
          published: isPublished,
        },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000);
      window.location.reload();
    } catch (e) {
      setMessage(e.response.data.error);

      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000" + location.pathname + "/" + editingCourseId,
        {
          title,
          description,
          price,
          imageLink: thumbnail,
          published: isPublished,
        },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000);
      window.location.reload();
    } catch (e) {
      console.log(e);
      setMessage(e.response.data.error);

      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handlePurchase(course) {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/courses/" + course._id,
        {},
        { withCredentials: true }
      );

      setMessage(response.data.message);

      setTimeout(() => setMessage(""), 3000);
    } catch (e) {
      console.log(e);
      setMessage("Failed to purchase course.");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  function editCourse(course) {
    setIsEditing(true);
    setEditingCourseId(course._id);

    setTitle(course.title);
    setDescription(course.description);
    setPrice(course.price);
    setThumbnail(course.imageLink);
    setIsPublished(course.published);
    setInputPopupVisibility(true);
  }

  if (userType === "admin") {
    return (
      <>
        {inputPopupVisibility && (
          <div className="z-20 absolute w-screen h-screen bg-black/30">
            <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-sm">
              <div className="flex justify-between items-center mb-10">
                <p className="text-md">
                  {isEditing ? "Update Course" : "Add Course"}
                </p>
                <MdCancel
                  className="cursor-pointer text-md"
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                    }

                    setInputPopupVisibility(false);
                    setTitle("");
                    setDescription("");
                    setThumbnail("");
                    setPrice(100);
                    setIsPublished(true);
                  }}
                />
              </div>
              <form
                className="flex flex-col"
                onSubmit={isEditing ? handleUpdate : handlePublish}
              >
                <label htmlFor="title" className="font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className={`border-2 rounded-sm outline-2 outline-primary p-1 ${
                    isInvalidTitle ? "border-red-500" : "border-black/5"
                  }`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {isInvalidTitle && (
                  <span className="text-xs text-red-500">{isInvalidTitle}</span>
                )}

                <label htmlFor="description" className="font-medium mt-5">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  className={`border-2 rounded-sm outline-2 outline-primary p-1 ${
                    isInvalidDescription ? "border-red-500" : "border-black/5"
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                {isInvalidDescription && (
                  <span className="text-xs text-red-500">
                    {isInvalidDescription}
                  </span>
                )}

                <label htmlFor="price" className="font-medium mt-5">
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  className={`border-2 rounded-sm outline-2 outline-primary p-1 ${
                    isInvalidPrice ? "border-red-500" : "border-black/5"
                  }`}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  value={price}
                  required
                />
                {isInvalidPrice && (
                  <span className="text-xs text-red-500">{isInvalidPrice}</span>
                )}

                <label htmlFor="thumbnail" className="font-medium mt-5">
                  Thumbnail
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  className={`border-2 rounded-sm outline-2 outline-primary p-1 ${
                    isInvalidThumbnail ? "border-red-500" : "border-black/5"
                  }`}
                  onChange={(e) => setThumbnail(e.target.value)}
                  value={thumbnail}
                  required
                />
                {isInvalidThumbnail && (
                  <span className="text-xs text-red-500">
                    {isInvalidThumbnail}
                  </span>
                )}

                <label htmlFor="publish" className="font-medium mt-5">
                  Publish
                </label>
                <select
                  id="publish"
                  className="border-2 rounded-sm outline-2 outline-primary p-1"
                  onChange={(e) =>
                    e.target.value === "yes"
                      ? setIsPublished(true)
                      : setIsPublished(false)
                  }
                >
                  <option value="yes" selected={isPublished}>
                    Yes
                  </option>
                  <option value="no" selected={!isPublished}>
                    No
                  </option>
                </select>

                <button
                  type="submit"
                  className="bg-primary text-white rounded-sm p-1 mt-5"
                >
                  {isEditing ? "Update Course" : "Add Course"}
                </button>
              </form>
            </div>
          </div>
        )}
        <div
          className={`flex flex-col gap-10 px-10 mb-10 sm:px-20 ${
            inputPopupVisibility && "pointer-events-none select-none"
          }`}
        >
          {message && (
            <span className="z-30 fixed text-sm left-5 bottom-5 bg-primary text-white p-2 rounded-md flex items-center justify-center gap-2">
              <IoIosInformationCircleOutline className="text-base" />
              {message}
            </span>
          )}

          <Navbar links={navbarLinks} />
          <p className="text-lg font-semibold tracking-tight mt-24">
            Your Courses
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
            {courses.length === 0 && (
              <span className="font-medium">No Courses Published.</span>
            )}
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                imageURL={course.imageLink}
                title={course.title}
                price={course.price + "₹"}
                description={course.description}
                creator={course.creatorId.username}
                buttonHandler={() => editCourse(course)}
                isBought={true}
              />
            ))}
          </div>
          <button
            className="bg-primary text-white rounded-sm p-1"
            onClick={() => setInputPopupVisibility(true)}
          >
            Add Course
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex flex-col gap-10 px-10 mb-10 sm:px-20">
        {message && (
          <span className="fixed text-sm left-5 bottom-5 bg-primary text-white p-2 rounded-md flex items-center justify-center gap-2">
            <IoIosInformationCircleOutline className="text-base" />
            {message}
          </span>
        )}

        <Navbar links={navbarLinks} />
        <p className="text-lg font-semibold tracking-tight mt-24">
          👋 Hello, there
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
          {courses.length === 0 && (
            <span className="font-medium">No Courses Available.</span>
          )}

          {courses.map((course) => (
            <CourseCard
              key={course._id}
              imageURL={course.imageLink}
              title={course.title}
              price={course.price + "₹"}
              description={course.description}
              creator={course.creatorId.username}
              buttonHandler={() => handlePurchase(course)}
              isBought={false}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Courses;
