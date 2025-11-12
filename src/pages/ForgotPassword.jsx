import { useState } from "react";
import { useAuth } from "../context/AuthContext1";
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
      console.log(error);

      toast.error("❌ No user found with that email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black px-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-6 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Reset Your Password
        </h2>

        <p className="text-center text-gray-400 mb-6 text-sm">
          Enter your registered email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-linear-to-r from-green-500 to-emerald-600 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-transform transform hover:scale-[1.02]">
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
