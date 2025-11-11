import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext1";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-base-100 shadow-md px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/public/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold">FinEase</h1>
      </div>

      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "font-semibold" : "")}>
          Home
        </NavLink>
        {user && (
          <>
            <NavLink
              to="/add-transaction"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}>
              Add Transaction
            </NavLink>
            <NavLink
              to="/my-transactions"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}>
              My Transactions
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}>
              Reports
            </NavLink>
          </>
        )}

        {!user ? (
          <>
            <NavLink to="/login" className="btn btn-sm btn-outline">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-sm btn-primary">
              Signup
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <img
                src={user.photoURL || "/avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <span>{user.displayName}</span>
              </li>
              <li>
                <span>{user.email}</span>
              </li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
