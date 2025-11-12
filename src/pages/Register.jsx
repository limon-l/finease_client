import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success("Registered successfully!");
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black px-4 py-8">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-6 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition pr-10"
            />
            <span
              className="absolute right-3 top-10 text-gray-300 cursor-pointer"
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
            className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 rounded-lg font-semibold text-white shadow-lg hover:opacity-90 transition-transform transform hover:scale-[1.02]">
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            className="flex items-center justify-center w-full gap-2 py-3 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-800 transition">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm pt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:text-green-300 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
