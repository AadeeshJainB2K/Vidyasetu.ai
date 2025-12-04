import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import SplineClient from "../components/SplineClient";
import ClientErrorBoundary from "../components/ClientErrorBoundary";

// const Spline = dynamic(() => import("@splinetool/react-spline"), {
//   ssr: false,
// });

export default function HomePage() {
  return (
    <div className="relative bg-gray-50 overflow-x-hidden">
      {/* 
        This container defines the total scrollable height of the page.
        The Spline component will be fixed to the viewport, and its animation
        will be driven by the scroll position of this long page.
      */}
      <div className="w-full h-[300vh]">
        {" "}
        {/* Example: 300vh for a long scroll */}
        {/* Spline component fixed to the viewport, always visible */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <ClientErrorBoundary>
            <SplineClient
              scene="https://prod.spline.design/Fg8YMaIBXmGB9xiO/scene.splinecode"
              className="w-full h-full"
            />
          </ClientErrorBoundary>
        </div>
        {/* Header - fixed to stay visible during scroll */}
        <div className="fixed top-0 left-0 w-full z-20 pointer-events-auto">
          <HomeHeader />
        </div>
        {/* Content sections - absolutely positioned over the Spline */}
        {/* Use pointer-events-none on the container to allow interaction with Spline where content is transparent */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <main className="flex flex-col items-center p-6">
            {/* Section 1 */}
            <section className="h-screen flex flex-col items-center justify-center text-center pointer-events-auto">
              <h1 className="text-4xl font-bold mb-4 text-blue-700">
                Welcome to Vidyasetu.ai!
              </h1>
              <p className="text-lg text-gray-700 mb-2 max-w-2xl">
                This is a simple, fast, and scalable home page. Scroll to
                interact with the 3D background.
              </p>
              <p className="text-lg text-gray-600">Scroll down to see more.</p>
            </section>

            {/* Section 3 */}
            <section className="h-screen flex items-center justify-center pointer-events-auto">
              <p className="text-xl text-gray-700">More content coming soon!</p>
            </section>

            {/* Add more sections as needed to fill the 300vh scroll space */}
            {/* For example, if you have 3 h-screen sections, you might want h-[300vh] for the parent */}
          </main>
        </div>
        {/* Footer - positioned at the bottom of the scrollable area */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
