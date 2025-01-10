import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="navbar-brand">
        <h1 className="text-xl font-bold">GES Registration</h1>
      </div>
      <ul className="navbar-links flex space-x-6">
        <li>
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-gray-300 transition-colors">Register</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
