//this is a commit

"use client";

import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your authentication API call here
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden flex">

        {/* LEFT IMAGE SECTION */}
        <div className="w-1/2 min-h-[550px] hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
            className="w-full h-full object-cover"
            alt="Login banner"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-gray-900">Login</h2>
          <p className="text-gray-600 mt-1 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  placeholder="Enter your password"
                />

                {/* Toggle visibility */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-4 text-gray-500">Or continue with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <button className="w-1/2 border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-100 transition">
              <img src="/google-icon.svg" className="w-5" />
              Google
            </button>

            <button className="w-1/2 border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-100 transition">
              <img src="/apple-icon.svg" className="w-5" />
              Apple
            </button>
          </div>

          <p className="text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}




















