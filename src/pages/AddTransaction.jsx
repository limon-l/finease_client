import { useState } from "react";
import { useAuth } from "../context/AuthContext1";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AddTransaction() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a transaction.");
      return;
    }

    if (!formData.category || !formData.amount || !formData.date) {
      toast.error("Please fill all required fields.");
      return;
    }

    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount),
      email: user.email,
      name: user.displayName,
      date: new Date(formData.date),
    };

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5173/transactions",
        dataToSend
      );
      if (res.data.insertedId) {
        toast.success("Transaction added successfully!");
        setFormData({
          type: "income",
          category: "",
          amount: "",
          description: "",
          date: "",
        });
      }
    } catch (err) {
      toast.error("Failed to add transaction. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium">Type:</label>
            <select
              name="type"
              className="select select-bordered w-1/2"
              value={formData.type}
              onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Category:</label>
            <select
              name="category"
              className="select select-bordered w-full"
              value={formData.category}
              onChange={handleChange}
              required>
              <option value="">Select category</option>
              <option value="salary">Salary</option>
              <option value="home">Home</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Amount:</label>
            <input
              type="number"
              name="amount"
              className="input input-bordered w-full"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description:</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Write details (optional)"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date:</label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input
              type="text"
              className="input input-bordered w-full"
              value={user?.email || ""}
              readOnly
            />
            <input
              type="text"
              className="input input-bordered w-full"
              value={user?.displayName || ""}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4">
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
