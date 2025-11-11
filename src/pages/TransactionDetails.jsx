import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext1";
import { toast } from "react-hot-toast";

export default function TransactionDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:5173/transactions/${id}`);
        if (res.data.email !== user.email) {
          toast.error("You cannot view this transaction.");
          return;
        }
        setTransaction(res.data);

        // fetch total amount for this category
        const catRes = await axios.get(
          `http://localhost:5173/transactions/category-total?email=${user.email}&category=${res.data.category}`
        );
        setCategoryTotal(catRes.data.total);
      } catch (err) {
        console.log(err);

        toast.error("Failed to fetch transaction details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, user]);

  if (loading) return <LoadingSpinner />;
  if (!transaction)
    return <p className="text-center mt-4">Transaction not found</p>;

  return (
    <div className="max-w-md mx-auto bg-base-100 shadow-xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Transaction Details 💳</h2>
      <p>
        <strong>Type:</strong> {transaction.type}
      </p>
      <p>
        <strong>Category:</strong> {transaction.category}
      </p>
      <p>
        <strong>Amount:</strong> ${transaction.amount}
      </p>
      <p>
        <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {transaction.description || "No description"}
      </p>
      <p className="mt-3 font-semibold">
        Total Amount in {transaction.category}: ${categoryTotal}
      </p>

      <Link to="/my-transactions" className="btn btn-outline btn-sm mt-4">
        Back to Transactions
      </Link>
    </div>
  );
}
