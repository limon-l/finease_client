import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext1";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-yellow-400">FinEase</h1>
      </Link>

      <div className="flex items-center gap-6">
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
                <li className="font-semibold">{user.displayName || "User"}</li>
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
    </nav>
  );
}
