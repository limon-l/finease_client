import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-yellow-400 font-bold text-xl">FinEase</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 text-gray-300 text-sm md:text-base">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/terms" className="hover:text-yellow-400 transition-colors">
            Terms & Conditions
          </Link>
          <span>
            Contact:{" "}
            <a
              href="mailto:info@finease.com"
              className="hover:text-yellow-400 transition-colors">
              info@finease.com
            </a>
          </span>
        </div>

        <div className="flex gap-4 text-gray-300">
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <FaFacebook size={22} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <FaInstagram size={22} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <FaTwitter size={22} />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} FinEase. All rights reserved.
      </div>
    </footer>
  );
}
