import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/logout", {
          withCredentials: true,
        })
        .then((response) => {
          localStorage.removeItem("userType");
          setMessage(response.data.message);
        });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (e) {
      setMessage(e.response.data.error);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Navbar
        links={[
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
        ]}
      />
      <p className="text-md font-medium text-center">{message}</p>
      <p>You will be redirected to the Home page in short time.</p>
      <p>
        If not redirected,{" "}
        <Link to="/" className="text-primary underline">
          click here
        </Link>
      </p>
    </div>
  );
};

export default Logout;
