import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MyTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");

  const fetchTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://finease-server-hmpp.onrender.com/transactions?email=${user.email}&sort=${sortBy}`
      );

      if (Array.isArray(res.data)) {
        setTransactions(res.data);
      } else if (Array.isArray(res.data.transactions)) {
        setTransactions(res.data.transactions);
      } else {
        setTransactions([]);
        toast.error("Unexpected data format from server.");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      toast.error("Failed to fetch transactions.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user, sortBy]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    try {
      await axios.delete(
        `https://finease-server-hmpp.onrender.com/transactions/${id}`
      );
      toast.success("Transaction deleted successfully!");
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete transaction.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[80vh] px-4 py-3 md:py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Transactions
          </h2>

          <div className="flex gap-2 items-center">
            <label className="text-gray-800 font-medium">Sort by:</label>
            <select
              className="select w-40 border border-gray-300 bg-gray-100 text-gray-900 focus:border-blue-400 focus:ring focus:ring-blue-200 rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
        </div>

        {transactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((t) => (
              <div
                key={t._id || t.id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-shadow">
                <p className="font-semibold text-gray-900">Type: {t.type}</p>
                <p className="text-gray-700">Category: {t.category}</p>
                <p className="text-gray-700">Amount: ${t.amount}</p>
                <p className="text-gray-700">
                  Date: {new Date(t.date).toLocaleDateString()}
                </p>

                <div className="flex justify-between mt-5 gap-2 flex-wrap">
                  <Link
                    to={`/transaction/${t._id}`}
                    className="px-3 py-1 text-sm rounded-md border border-gray-400 text-gray-900 hover:bg-gray-100 transition">
                    View
                  </Link>

                  <Link
                    to={`/transaction/update/${t._id}`}
                    className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(t._id)}
                    className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
}
