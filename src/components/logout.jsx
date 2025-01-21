import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("jwtToken"); 
    console.log("User logged out successfully");
    setTimeout(() => {
        window.location.href = "/login";
      }, 100);
};

export default Logout;
