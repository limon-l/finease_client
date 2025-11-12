import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://finease-server-hmpp.onrender.com";

const TransactionDetails = ({ transactionId, userEmail }) => {
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!transactionId || !userEmail) return;

    const fetchTransaction = async () => {
      try {
        setLoading(true);
        setError("");

        const { data: transactionData } = await axios.get(
          `${BASE_URL}/transactions/${transactionId}`,
          { withCredentials: true }
        );
        setTransaction(transactionData);

        const { data: totalData } = await axios.get(
          `${BASE_URL}/transactions/category-total?email=${encodeURIComponent(
            userEmail
          )}&category=${encodeURIComponent(transactionData.category)}`,
          { withCredentials: true }
        );
        setCategoryTotal(totalData.total || 0);
      } catch (err) {
        console.error("Error fetching transaction or category total:", err);
        if (err.response) {
          setError(err.response.data.message || "Server error occurred");
        } else if (err.request) {
          setError("Network error: Unable to reach server");
        } else {
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, userEmail]);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">Loading...</div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 text-lg">{error}</div>
    );

  if (!transaction)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Transaction not found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Transaction Details
      </h1>

      <div className="space-y-4">
        <DetailRow label="ID" value={transaction._id} />
        <DetailRow
          label="Type"
          value={transaction.type}
          valueClass={
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }
        />
        <DetailRow label="Category" value={transaction.category} />
        <DetailRow label="Amount" value={`$${transaction.amount}`} />
        <DetailRow label="Description" value={transaction.description} />
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="text-lg font-semibold text-center">
        Total spent in{" "}
        <span className="text-blue-600">{transaction.category}</span>: $
        {categoryTotal}
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
