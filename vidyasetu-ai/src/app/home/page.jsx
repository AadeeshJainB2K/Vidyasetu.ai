import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import SplineClient from "../components/SplineClient";
import ClientErrorBoundary from "../components/ClientErrorBoundary";

// const Spline = dynamic(() => import("@splinetool/react-spline"), {
//   ssr: false,
// });

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Sticky, fullscreen interactive Spline background */}
      <div className="sticky top-0 h-screen w-full z-0">
        <ClientErrorBoundary>
          <SplineClient
            scene="https://prod.spline.design/Fg8YMaIBXmGB9xiO/scene.splinecode"
            className="w-full h-full"
          />
        </ClientErrorBoundary>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 -mt-[100vh]">
        <HomeHeader />
        <main className="flex flex-col items-center p-6">
          <section className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4 text-blue-700">
              Welcome to Vidyasetu.ai!
            </h1>
            <p className="text-lg text-gray-700 mb-2 max-w-2xl">
              This is a simple, fast, and scalable home page. Interact with the
              3D background or use the header to navigate.
            </p>
            <p className="text-lg text-gray-600">Scroll down to see more.</p>
          </section>

          <section className="h-screen flex flex-col items-center justify-center text-center bg-white bg-opacity-75 rounded-lg p-8 my-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Our Features
            </h2>
            <p className="text-md text-gray-600 max-w-xl">
              This section demonstrates how content can scroll over the 3D
              background. The background remains interactive. You can add more
              sections like this to build out your landing page.
            </p>
          </section>

          <section className="h-screen flex items-center justify-center">
            <p className="text-xl text-gray-700">More content coming soon!</p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
