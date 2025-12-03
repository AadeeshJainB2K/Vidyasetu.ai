import Header from "../header/header";
import Spline from "@splinetool/react-spline/next";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex-grow flex bg-gray-50 overflow-hidden">
        {/* Left half for text content */}
        <div className="w-1/2 flex items-center justify-center z-10 p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Welcome to Vidyasetu.ai
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Your bridge to a brighter future. Discover innovative solutions
              and connect with opportunities.
            </p>
          </div>
        </div>
        {/* Right half for Spline component */}
        <div className="w-1/2 relative z-0">
          <Spline scene="https://prod.spline.design/zeSzOysNUTYOI3rn/scene.splinecode" />
        </div>
      </div>
    </main>
  );
}
