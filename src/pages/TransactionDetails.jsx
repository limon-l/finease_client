import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://finease-server-hmpp.onrender.com";

const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);

        const transactionRes = await axios.get(
          `${BASE_URL}/transactions/${id}`
        );
        setTransaction(transactionRes.data);

        const categoryRes = await axios.get(
          `${BASE_URL}/transactions/category-total`,
          {
            params: {
              email: user.email,
              category: transactionRes.data.category,
            },
          }
        );
        setCategoryTotal(categoryRes.data.total || 0);
      } catch (err) {
        console.error("Error fetching transaction details:", err);
        setError("Failed to fetch transaction details.");
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.email) {
      fetchTransaction();
    } else {
      setError("Invalid transaction ID or user email.");
      setLoading(false);
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">{error}</div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Transaction not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Transaction Details
      </h1>

      <div className="space-y-4">
        <DetailRow label="ID" value={transaction._id} />
        <DetailRow
          label="Type"
          value={transaction.type}
          valueClass={
            transaction.type === "income"
              ? "text-green-600 font-bold"
              : "text-red-600 font-bold"
          }
        />
        <DetailRow label="Category" value={transaction.category} />
        <DetailRow
          label="Amount"
          value={`$${transaction.amount}`}
          valueClass={
            transaction.type === "income"
              ? "text-green-700 font-semibold"
              : "text-red-700 font-semibold"
          }
        />
        <DetailRow label="Description" value={transaction.description || "—"} />
        <DetailRow
          label="Date"
          value={new Date(transaction.date).toLocaleString()}
        />
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="text-lg font-semibold text-center">
        Total spent in{" "}
        <span className="text-blue-600">{transaction.category}</span>: $
        {categoryTotal}
      </div>

      <div className="text-center mt-6">
        <Link
          to="/my-transactions"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          ← Back to Transactions
        </Link>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, valueClass }) => (
  <div className="flex justify-between border-b border-gray-100 pb-2">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className={valueClass || "text-gray-800"}>{value}</span>
  </div>
);

export default TransactionDetails;
