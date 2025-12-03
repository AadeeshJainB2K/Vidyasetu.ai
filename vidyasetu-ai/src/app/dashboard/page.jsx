"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeaderWrapper from "../components/HeaderWrapper";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect only when there's no session and status says unauthenticated.
    // This avoids redirecting during brief `loading` states when a valid
    // session exists (which caused a flicker loop previously).
    if (status === "unauthenticated" && !session) {
      router.push("/login");
    }
  }, [status, router]);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/home" });
  };

  // Only show the global loading spinner when we don't already have a session.
  // If `session` exists but `status` flips to "loading" briefly during
  // client navigation, we want to keep showing the page content to avoid
  // a jarring flash.
  if (status === "loading" && !session) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeaderWrapper />
        <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderWrapper />
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-blue-700">
              Welcome, {session.user?.name}!
            </h1>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Profile Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Name</p>
                  <p className="text-lg text-gray-800">{session.user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Email</p>
                  <p className="text-lg text-gray-800">{session.user?.email}</p>
                </div>
                {session.user?.id && (
                  <div>
                    <p className="text-sm text-blue-700 font-medium">User ID</p>
                    <p className="text-sm text-gray-600 break-all">
                      {session.user.id}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Picture */}
            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">
                Profile Picture
              </h2>
              {session.user?.image ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400">
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/home"
              className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition text-center"
            >
              <p className="font-semibold text-blue-700">Back to Home</p>
              <p className="text-sm text-gray-600">Return to homepage</p>
            </a>
            <a
              href="/settings"
              className="p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 hover:border-green-400 transition text-center"
            >
              <p className="font-semibold text-green-700">Settings</p>
              <p className="text-sm text-gray-600">Manage your account</p>
            </a>
            <a
              href="/profile"
              className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-400 transition text-center"
            >
              <p className="font-semibold text-purple-700">Edit Profile</p>
              <p className="text-sm text-gray-600">Update your info</p>
            </a>
          </div>

          {/* Session Info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Session Status:</span> Active
            </p>
            <p className="text-xs text-gray-500 mt-2">
              You are securely logged in. Your session will expire after 30 days
              of inactivity.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
