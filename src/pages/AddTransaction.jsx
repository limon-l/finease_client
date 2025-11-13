import { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
      toast.error("🚫 You must be logged in to add a transaction.");
      return;
    }

    if (!formData.category || !formData.amount || !formData.date) {
      toast.error("⚠️ Please fill all required fields.");
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
        "https://finease-server-hmpp.onrender.com/transactions",
        dataToSend
      );

      if (res.data.insertedId || res.data._id) {
        toast.success("✅ Transaction added successfully!");
        setFormData({
          type: "income",
          category: "",
          amount: "",
          description: "",
          date: "",
        });
      } else {
        toast.error("⚠️ Unexpected response. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add transaction. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "input w-full bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md";
  const textareaClass =
    "textarea w-full bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 resize-none rounded-md";
  const selectClass =
    "select w-full bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md";

  return (
    <div className="min-h-[80vh] flex justify-center items-start py-10 px-4 bg-gray-50">
      <div className="w-full max-w-[1200px] mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <label className="font-medium text-gray-800 md:w-1/4">Type:</label>
            <select
              name="type"
              className={selectClass + " md:w-1/2"}
              value={formData.type}
              onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <label className="font-medium text-gray-800 md:w-1/4">
              Category:
            </label>
            <select
              name="category"
              className={selectClass + " md:w-1/2"}
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

          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <label className="font-medium text-gray-800 md:w-1/4">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className={inputClass + " md:w-1/2"}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:gap-6">
            <label className="font-medium text-gray-800 md:w-1/4">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Write details (optional)"
              value={formData.description}
              onChange={handleChange}
              className={textareaClass + " md:w-1/2"}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <label className="font-medium text-gray-800 md:w-1/4">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={inputClass + " md:w-1/2"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className={inputClass + " bg-gray-100 cursor-not-allowed"}
              value={user?.email || ""}
              readOnly
            />
            <input
              type="text"
              className={inputClass + " bg-gray-100 cursor-not-allowed"}
              value={user?.displayName || ""}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3 text-lg font-semibold mt-2">
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
