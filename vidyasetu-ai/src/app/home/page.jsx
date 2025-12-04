import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import SplineClient from "../components/SplineClient";
import ClientErrorBoundary from "../components/ClientErrorBoundary";

// const Spline = dynamic(() => import("@splinetool/react-spline"), {
//   ssr: false,
// });

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Fullscreen interactive Spline background */}
      <div className="absolute inset-0 z-0">
        <ClientErrorBoundary>
          <SplineClient
            scene="https://prod.spline.design/Fg8YMaIBXmGB9xiO/scene.splinecode"
            className="w-full h-full"
            preventScroll={false}
          />
        </ClientErrorBoundary>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <HomeHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">
            Welcome to Vidyasetu.ai!
          </h1>
          <p className="text-lg text-gray-700 mb-2 max-w-2xl text-center">
            This is a simple, fast, and scalable home page. Interact with the 3D
            background or use the header to navigate.
          </p>
          {/* Add more content or feature sections here */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

//home
