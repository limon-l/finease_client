import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext1";
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
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">
          My Profile 👤
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex justify-center">
            <img
              src={formData.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Photo URL:</label>
            <input
              type="text"
              name="photoURL"
              className="input input-bordered w-full"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={user.email}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4">
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
