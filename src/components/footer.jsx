import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <span className="text-yellow-400 font-extrabold text-2xl md:text-3xl">
            FinEase
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 text-gray-300 text-sm md:text-base text-center md:text-left">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/terms" className="hover:text-yellow-400 transition-colors">
            Terms & Conditions
          </Link>
          <span className="hover:text-yellow-400 transition-colors">
            Contact:{" "}
            <a href="mailto:info@finease.com" className="hover:text-yellow-400">
              info@finease.com
            </a>
          </span>
        </div>

        <div className="flex gap-5 text-gray-300 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/"
            className="hover:text-yellow-400 transition-colors">
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/"
            className="hover:text-yellow-400 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a
            href="https://x.com/"
            className="hover:text-yellow-400 transition-colors">
            <FaXTwitter size={24} />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} FinEase. All rights reserved.
      </div>
    </footer>
  );
}
