import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { validateUsername } from "../utils/validateUsername";
import { validatePassword } from "../utils/validatePassword";

// Icons
import { LuBook } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";

const Register = () => {
  const userType = window.location.pathname.includes("/admin")
    ? "admin"
    : "users";

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(null);

  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(null);

  async function handleRegister(e) {
    e.preventDefault();

    if (invalidUsername || invalidPassword || !username || !password) {
      console.log("Invalid");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + window.location.pathname,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("userType", userType);
      navigate("/" + userType + "/courses");
    } catch (e) {
      setInvalidUsername(e.response.data.error);
    }
  }

  return (
    <div className="flex">
      <Link
        to="/"
        className="absolute flex items-center justify-center gap-3 top-3 left-3"
      >
        <FaArrowLeftLong />
        <p>Back to Home</p>
      </Link>
      <div className="hidden sm:flex flex-col justify-center items-center w-1/2 bg-slate-100 p-5">
        <p className="italic">
          "The Only Way to Do Great Work is to Love What You Do."
          <br />
          <span className="not-italic">- Steve Jobs</span>
        </p>
      </div>
      <hr className="hidden sm:block border-l-2 h-screen" />
      <div className="w-full h-screen sm:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <form
            className="lg:w-2/3 px-10 flex flex-col text-sm mb-10"
            onSubmit={handleRegister}
          >
            <p className="text-base">Coursify</p>
            <p className="text-md font-medium flex items-center mb-10">
              <LuBook />
              Register
              {userType === "users" ? " Now" : " as a Seller"}
            </p>
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`border-2 rounded-sm outline-2 outline-primary p-1 pl-5 ${
                invalidUsername ? "border-red-500" : "border-black/5"
              }`}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => {
                const error = validateUsername(username);

                if (error) {
                  setInvalidUsername(error);
                } else {
                  setInvalidUsername(null);
                }
              }}
            />
            {invalidUsername && (
              <span className="text-xs text-red-500">{invalidUsername}</span>
            )}

            <label htmlFor="password" className="font-medium mt-5">
              Password
            </label>
            <input
              type="text"
              id="password"
              className={`border-2 rounded-sm outline-2 outline-primary p-1 pl-5 ${
                invalidPassword ? "border-red-500" : "border-black/5"
              }`}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                const error = validatePassword(password);

                if (error) {
                  setInvalidPassword(error);
                } else {
                  setInvalidPassword(null);
                }
              }}
            />
            {invalidPassword && (
              <span className="text-xs text-red-500">{invalidPassword}</span>
            )}

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white rounded-sm p-1 px-3 mt-5"
            >
              <p className="px-2">Register</p>
            </button>
          </form>

          <span className="text-sm ">
            Already Registered?
            <Link
              to={"/" + userType + "/login"}
              className="text-primary hover:underline cursor-pointer px-1"
            >
              Log in
            </Link>
          </span>

          {userType === "users" && (
            <span className="text-sm">
              Want to sell courses?
              <Link
                to={"/admin/register"}
                className="text-primary hover:underline cursor-pointer px-1"
              >
                Register as a seller
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
