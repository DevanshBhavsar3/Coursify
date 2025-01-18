import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

// Icons
import { LuBook } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";

const Login = () => {
  const userType = window.location.pathname.includes("/admin")
    ? "admin"
    : "users";

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      console.log("Invalid");
      return;
    }

    try {
      const response = await axios.post(
        "https://coursify-backend-8frn3v0sl-devanshs-projects-42de0e47.vercel.app" +
          window.location.pathname,
        {},
        {
          withCredentials: true,
          headers: {
            Username: username,
            Password: password,
          },
        }
      );

      localStorage.setItem("userType", userType);
      navigate("/" + userType + "/courses");
    } catch (e) {
      setError(e.response.data.error);
    }
  }
  return (
    <div className="flex ">
      <Link
        to="/"
        className="absolute flex items-center justify-center gap-3 top-3 left-3"
      >
        <FaArrowLeftLong />
        <p>Back to Home</p>
      </Link>
      <div className="hidden sm:flex flex-col justify-center items-center w-1/2 bg-slate-100 p-5">
        <p className="text-lg leading-[95%] tracking-tight text-center">
          Ready to Unlock <br /> Your Potential?
        </p>
      </div>
      <hr className="hidden sm:block border-l-2 h-screen" />
      <div className="w-full h-screen sm:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <form
            className="lg:w-2/3 px-10 flex flex-col text-sm mb-10"
            onSubmit={handleLogin}
          >
            <p className="text-base">Coursify</p>
            <p className="text-md font-medium flex items-center mb-10">
              <LuBook />
              Log in {userType === "users" ? "" : "to your Seller account"}
            </p>
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border-2 rounded-sm outline-2 outline-primary p-1 pl-5"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="font-medium mt-5">
              Password
            </label>
            <input
              type="text"
              id="password"
              className="border-2 rounded-sm outline-2 outline-primary p-1 pl-5"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <span className="text-red-500">{error}</span>}

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white rounded-sm p-1 px-3 mt-5"
            >
              <p className="px-2">Log in</p>
            </button>
          </form>
          <Link to={"/" + userType + "/register"} className="text-sm">
            New to Coursify?
            <span className="text-primary hover:underline cursor-pointer px-1">
              Create an account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
