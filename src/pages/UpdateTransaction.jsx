import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

export default function UpdateTransaction() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchTransaction = async () => {
      try {
        const res = await axios.get(
          `https://finease-server-hmpp.onrender.com/transactions/${id}`
        );
        if (res.data.email !== user.email) {
          toast.error("You cannot edit this transaction.");
          navigate("/my-transactions");
          return;
        }
        setFormData({
          type: res.data.type,
          category: res.data.category,
          amount: res.data.amount,
          description: res.data.description,
          date: new Date(res.data.date).toISOString().split("T")[0],
        });
      } catch (err) {
        console.log(err);

        toast.error("Failed to fetch transaction.");
        navigate("/my-transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await axios.put(
        `https://finease-server-hmpp.onrender.com/transactions/${id}`,
        formData
      );
      toast.success("Transaction updated successfully!");
      navigate(`/transaction/${id}`);
    } catch (err) {
      console.log(err);

      toast.error("Failed to update transaction.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Update Transaction
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
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

          <button
            type="submit"
            disabled={submitLoading}
            className="btn btn-primary w-full mt-4">
            {submitLoading ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
