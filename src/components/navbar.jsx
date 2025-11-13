import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-yellow-400">FinEase</h1>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-300 transition-colors"
            }>
            Home
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/add-transaction"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-300 transition-colors"
                }>
                Add Transaction
              </NavLink>
              <NavLink
                to="/my-transactions"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-300 transition-colors"
                }>
                My Transactions
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-300 transition-colors"
                }>
                Reports
              </NavLink>
            </>
          )}

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="bg-yellow-500 text-gray-900 px-4 py-1 rounded-md font-medium hover:bg-yellow-400 transition-colors">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-transparent border border-yellow-500 text-yellow-500 px-4 py-1 rounded-md font-medium hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                Signup
              </NavLink>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.photoURL || "/avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg text-white p-3 space-y-2 z-50">
                  <li className="font-semibold">
                    {user.displayName || "User"}
                  </li>
                  <li className="text-sm text-gray-300">{user.email}</li>
                  <li>
                    <NavLink
                      to="/profile"
                      className="block px-3 py-1 rounded hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-colors">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-yellow-400 text-2xl focus:outline-none">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white px-6 py-4 space-y-3">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold block"
                : "hover:text-yellow-300 block transition-colors"
            }>
            Home
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/add-transaction"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold block"
                    : "hover:text-yellow-300 block transition-colors"
                }>
                Add Transaction
              </NavLink>
              <NavLink
                to="/my-transactions"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold block"
                    : "hover:text-yellow-300 block transition-colors"
                }>
                My Transactions
              </NavLink>
              <NavLink
                to="/reports"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold block"
                    : "hover:text-yellow-300 block transition-colors"
                }>
                Reports
              </NavLink>
            </>
          )}

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-yellow-500 text-gray-900 px-4 py-1 rounded-md font-medium hover:bg-yellow-400 transition-colors block text-center">
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-transparent border border-yellow-500 text-yellow-500 px-4 py-1 rounded-md font-medium hover:bg-yellow-500 hover:text-gray-900 transition-colors block text-center">
                Signup
              </NavLink>
            </>
          ) : (
            <div className="border-t border-gray-700 pt-3 space-y-2">
              <span className="font-semibold">
                {user.displayName || "User"}
              </span>
              <span className="text-sm text-gray-300">{user.email}</span>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1 rounded hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
