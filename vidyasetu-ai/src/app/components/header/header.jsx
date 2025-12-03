import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">
        <Link href="/">Vidyasetu.ai</Link>
      </div>
      <nav className="flex items-center space-x-6">
        <Link
          href="/about"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          About
        </Link>
        <Link
          href="/services"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          Services
        </Link>
        <Link
          href="/contact"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          Contact
        </Link>
        <Link
          href="/login"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
