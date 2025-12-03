import React from "react";

const Header = () => (
  <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
    <div className="text-2xl font-bold text-blue-700">Vidyasetu</div>
    <div className="flex items-center space-x-4">
      <a href="/home" className="text-gray-700 hover:text-blue-700 transition">
        Home
      </a>
      <a
        href="/signup"
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition font-semibold"
      >
        Sign Up
      </a>
      <a
        href="/login"
        className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition font-semibold"
      >
        Login
      </a>
    </div>
  </header>
);

export default Header;
