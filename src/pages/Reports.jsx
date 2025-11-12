import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Reports() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `https://finease-server-hmpp.onrender.com/transactions?email=${user.email}`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setTransactions(data);
      } catch (err) {
        console.log("Error fetching reports:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const income = transactions.filter((t) => t.type.toLowerCase() === "income");
  const expense = transactions.filter(
    (t) => t.type.toLowerCase() === "expense"
  );

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-[80vh] px-4 py-10 bg-gray-50 ">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Financial Report
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
            <div className="text-gray-700 font-medium mb-2">Total Income</div>
            <div className="text-2xl font-bold text-green-600">
              ${totalIncome}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
            <div className="text-gray-700 font-medium mb-2">Total Expense</div>
            <div className="text-2xl font-bold text-red-600">
              ${totalExpense}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
            <div className="text-gray-700 font-medium mb-2">Net Balance</div>
            <div className="text-2xl font-bold text-blue-600">${balance}</div>
          </div>
        </div>
      </div>

      {transactions.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Transactions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions
              .slice(-6)
              .reverse()
              .map((t) => (
                <div
                  key={t._id || t.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-900">Type: {t.type}</p>
                  <p className="text-gray-700">Category: {t.category}</p>
                  <p className="text-gray-700">Amount: ${t.amount}</p>
                  <p className="text-gray-700">
                    Date: {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
