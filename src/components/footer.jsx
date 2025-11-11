import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <img src="/public/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-lg">FinEase</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <span>Contact: info@finease.com</span>
        </div>

        <div className="flex gap-4">
          <a href="#">
            <FaFacebook size={20} />
          </a>
          <a href="#">
            <FaInstagram size={20} />
          </a>
          <a href="#">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
