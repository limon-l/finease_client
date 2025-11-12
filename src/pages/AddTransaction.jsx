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
        "http://localhost:5000/transactions",
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "input w-full bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200";

  const textareaClass =
    "textarea w-full bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 resize-none";

  const selectClass =
    "select w-full bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200";

  return (
    <div className="min-h-[80vh] flex justify-center items-start py-10 px-4 bg-gray-50">
      <div className="card w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-800">Type:</label>
            <select
              name="type"
              className={selectClass + " w-1/2 ms-3"}
              value={formData.type}
              onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800">
              Category:
            </label>
            <select
              name="category"
              className={selectClass}
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
            <label className="block font-medium mb-1 text-gray-800">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Write details (optional)"
              value={formData.description}
              onChange={handleChange}
              className={textareaClass}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800">
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <input
              type="text"
              className={inputClass + " bg-gray-100"}
              value={user?.email || ""}
              readOnly
            />
            <input
              type="text"
              className={inputClass + " bg-gray-100"}
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
