import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://finease-server-hmpp.onrender.com";

const TransactionDetails = ({ transactionId, userEmail }) => {
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);

        const transactionRes = await axios.get(
          `${BASE_URL}/transactions/${transactionId}`
        );
        setTransaction(transactionRes.data);

        const totalRes = await axios.get(
          `${BASE_URL}/transactions/category-total?email=${encodeURIComponent(
            userEmail
          )}&category=${encodeURIComponent(transactionRes.data.category)}`
        );
        setCategoryTotal(totalRes.data.total || 0);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching transaction:", err);
        setError("Failed to fetch transaction or category total.");
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, userEmail]);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!transaction)
    return (
      <div className="text-center mt-10 text-gray-500">
        No transaction found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold">ID:</span>
          <span>{transaction._id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Type:</span>
          <span
            className={
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }>
            {transaction.type}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Category:</span>
          <span>{transaction.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Amount:</span>
          <span>${transaction.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Description:</span>
          <span>{transaction.description}</span>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="text-lg font-semibold">
        Total spent in{" "}
        <span className="text-blue-600">{transaction.category}</span>: $
        {categoryTotal}
      </div>
    </div>
  );
};

export default TransactionDetails;
