import React, { useState } from "react";
import validator from "validator";
import {Button} from "../components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  axios.defaults.baseURL = 'http://127.0.0.1:8000';

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/v1/token/", formData);

      const accessToken = response.data.access;
      // console.log('Access Token:', accessToken);
      localStorage.setItem('jwtToken', accessToken);
  
      setMessage("Login Successful!");
      // setTimeout(() => {
      //   navigate("/");
      // }, 1500);

      
  
      console.log("Login Success");
    } catch (err) {

      console.error("Login Error:", err.response?.data || err.message);
      setMessage("Login Failed. Please try again.");
    }
  };
  

  return (
    <div className="bg-gray-100 flex flex-col md:flex-row items-center justify-center min-h-screen">
  {/* Image Section (Visible on Desktop) */}
  <div style={{padding:"20px"}} className="hidden md:block w-1/2">
    <img 
      src="src/assets/E-Cell Logo Black_Original.png" 
      alt="Signup Illustration" 
      className="object-cover h-full w-full"
    />
  </div>

  {/* Form Section */}
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md md:w-1/2">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
    {message && <p className="text-center text-red-500 mb-4">{message}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Email */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="username"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <div className="flex justify-start">
            <Button
            type="submit"
            // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </Button>
        </div>
      <div>
      <div>
        <div>
          <p>Are you new here?</p>
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </div>
      </div>
      </div>
      
    </div>
    </form>
  </div>
</div>

  );
};


export default Login;

