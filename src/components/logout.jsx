import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("jwtToken"); 
    console.log("User logged out successfully");

    return <Navigate to="/login" />;
};

export default Logout;
