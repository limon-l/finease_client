import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext1";
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
        `http://localhost:5173/transactions?email=${user.email}&sort=${sortBy}`
      );

      console.log("Fetched transactions:", res.data);

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
      await axios.delete(`http://localhost:5173/transactions/${id}`);
      toast.success("Transaction deleted successfully!");
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete transaction.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Transactions 💸</h2>

        <div className="flex gap-2">
          <label>Sort by:</label>
          <select
            className="select select-bordered"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>

      {Array.isArray(transactions) && transactions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((t) => (
            <div key={t._id || t.id} className="card bg-base-100 shadow-md p-4">
              <p className="font-semibold">Type: {t.type}</p>
              <p>Category: {t.category}</p>
              <p>Amount: ${t.amount}</p>
              <p>Date: {new Date(t.date).toLocaleDateString()}</p>

              <div className="flex justify-between mt-3">
                <Link
                  to={`/transaction/${t._id}`}
                  className="btn btn-sm btn-outline">
                  View
                </Link>

                <Link
                  to={`/transaction/update/${t._id}`}
                  className="btn btn-sm btn-primary">
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="btn btn-sm btn-error">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
}
