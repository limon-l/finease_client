import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: "", photoURL: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      toast.success("✅ Profile updated successfully!");
    } catch (err) {
      toast.error("❌ Failed to update profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="min-h-[80vh] flex justify-center items-start py-10 px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          My Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="flex justify-center">
            <img
              src={formData.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Photo URL:
            </label>
            <input
              type="text"
              name="photoURL"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Email:
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
              value={user.email}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-[1.02]">
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
