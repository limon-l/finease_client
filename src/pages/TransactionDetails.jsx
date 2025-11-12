import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/transactions/${id}`
        );
        setTransaction(data);

        try {
          const totalRes = await axios.get(
            `http://localhost:5000/transactions/category-total`,
            {
              params: { email: data.email, category: data.category },
            }
          );
          setCategoryTotal(totalRes.data.total || 0);
        } catch (catErr) {
          console.error("Error fetching category total:", catErr);
          setCategoryTotal(0);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching transaction:", err);
        setError("Failed to load transaction. Please try again.");
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-20">Loading transaction...</p>
    );
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
        Transaction Details
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Type:</span>
          <span className="text-gray-900 capitalize">{transaction.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Category:</span>
          <span className="text-gray-900 capitalize">
            {transaction.category}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Amount:</span>
          <span className="text-gray-900">${transaction.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Description:</span>
          <span className="text-gray-900">{transaction.description}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Date:</span>
          <span className="text-gray-900">
            {new Date(transaction.date).toLocaleString()}
          </span>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="text-center">
        <p className="text-lg font-semibold text-indigo-600">
          Total for this category:{" "}
          <span className="text-gray-800">${categoryTotal}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionDetails;
