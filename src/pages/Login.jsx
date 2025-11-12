import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black px-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-6 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Welcome Back !
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition pr-10"
            />
            <span
              className="absolute right-3 top-9 text-gray-300 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-linear-to-r from-green-500 to-emerald-600 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-transform transform hover:scale-[1.02]">
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            className="flex items-center justify-center w-full gap-2 py-2 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-800 transition">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </form>

        <div className="flex justify-between mt-5 text-sm text-gray-400">
          <Link
            to="/forgot-password"
            className="hover:text-green-400 transition">
            Forgot Password?
          </Link>
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-400 hover:text-green-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
