import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Logout = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      axios
        .get("https://coursify-backend-chi.vercel.app/logout", {
          withCredentials: true,
        })
        .then((response) => {
          localStorage.removeItem("userType");
          setMessage(response.data.message);
        });
    } catch (e) {
      setMessage(e.response.data.error);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
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
    </div>
  );
};

export default Logout;
