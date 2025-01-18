import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

const Logout = () => {
  useEffect(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
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

      <p className="text-md font-medium text-center">You are Logged out.</p>
    </div>
  );
};

export default Logout;
