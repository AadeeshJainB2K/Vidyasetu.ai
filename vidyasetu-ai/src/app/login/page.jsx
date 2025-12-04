"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HeaderWrapper from "../components/HeaderWrapper";
import dynamic from "next/dynamic";

// Load Spline only on the client to avoid hydration / async component errors
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});
import Footer from "../components/Footer";
import ClientErrorBoundary from "../components/ClientErrorBoundary";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    let fallbackTimer;
    if (status === "authenticated" && session) {
      // Try client-side navigation first
      try {
        router.replace("/dashboard");
      } catch (err) {
        // ignore and fallback to hard redirect
      }

      // If client navigation doesn't happen within 700ms, fallback to hard navigation
      fallbackTimer = setTimeout(() => {
        try {
          window.location.href = "/dashboard";
        } catch (e) {
          // final fallback: nothing we can do
        }
      }, 700);
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [status, session, router]);

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  // Show loading state if authenticated
  if (status === "authenticated") {
    return (
      <div className="flex flex-col min-h-screen">
        <HeaderWrapper />
        <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show loading state if session is still loading
  if (status === "loading") {
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

  return (
    <div className="relative min-h-screen bg-gray-50">
      <HeaderWrapper />

      <main className="relative z-10 flex flex-1 flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Left: form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Login to Vidyasetu
            </h2>

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 hover:border-blue-500 transition flex items-center justify-center gap-3 mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M15.171 13.576l1.414 1.414A6.981 6.981 0 0020 10c-1.274-4.057-5.064-7-9.542-7a7.971 7.971 0 00-3.357.692l2.072 2.072c.578-.639 1.43-1.05 2.357-1.05a4 4 0 014 4 3.99 3.99 0 01-.823 2.456l2.45 2.45z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {/* Removed stray SplineClient insertion (was causing parse error) */}
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right: interactive Spline scene (hidden on small screens) */}
        <div className="hidden md:block md:w-1/2 relative">
          <div
            className="absolute inset-0 h-full overflow-hidden flex items-center justify-center"
            onWheel={(e) => e.preventDefault()}
            style={{ touchAction: "none" }}
          >
            <ClientErrorBoundary>
              <Spline
                scene="https://prod.spline.design/y0g8NpIGWrv77SIm/scene.splinecode"
                className="w-full h-full transform md:scale-125 md:-translate-y-12 pointer-events-auto"
              />
            </ClientErrorBoundary>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
