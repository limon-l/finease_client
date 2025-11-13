import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-gray-50 text-center">
      <h1 className="text-7xl md:text-8xl font-extrabold mb-4 text-red-500 animate-pulse">
        404
      </h1>
      <p className="text-xl md:text-2xl mb-6 text-gray-700">
        Oops! The page you’re looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105">
        Go Back Home
      </Link>
    </div>
  );
}
