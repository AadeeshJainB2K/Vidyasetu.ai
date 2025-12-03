"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const HomeHeader = () => {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/home" });
  };

  const base = "w-full py-4 px-8 flex items-center justify-between";

  return (
    <header
      className={`${base} fixed top-4 left-1/2 transform -translate-x-1/2 max-w-6xl rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-lg z-20`}
    >
      <div className="text-2xl font-extrabold text-blue-700">Vidyasetu</div>

      <nav className="flex items-center space-x-4">
        <Link
          href="/home"
          className="text-gray-800 hover:text-blue-700 transition font-medium"
        >
          Home
        </Link>
        {session && (
          <Link
            href="/dashboard"
            className="text-gray-800 hover:text-blue-700 transition font-medium"
          >
            Dashboard
          </Link>
        )}

        {/* If user is authenticated show user menu, otherwise show auth links */}
        {session ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
            >
              <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm font-semibold">
                {session?.user?.name ? session.user.name.split(" ")[0] : "User"}
              </span>
              <svg
                className={`w-4 h-4 transition ${showMenu ? "rotate-180" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setShowMenu(false)}
                >
                  👤 Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setShowMenu(false)}
                >
                  ⚙️ Settings
                </Link>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition font-semibold"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-white text-gray-800 border border-gray-200 rounded-md hover:bg-gray-50 transition font-medium"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HomeHeader;
