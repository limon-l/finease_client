import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast.success("✅ Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("❌ No user found with that email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="w-full max-w-[400px] mx-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 md:p-10 text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-emerald-500">
          Reset Your Password
        </h2>

        <p className="text-center text-gray-300 mb-8 text-sm md:text-base">
          Enter your registered email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 rounded-lg font-semibold text-white shadow-lg hover:opacity-95 transition-transform transform hover:scale-105 duration-200">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-green-400 hover:text-green-300 transition font-medium">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
