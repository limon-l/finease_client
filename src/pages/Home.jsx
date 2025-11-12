import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `https://finease-server-hmpp.onrender.com/transactions?email=${user.email}`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-[80vh]">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-yellow-400 text-gray-900 p-12 rounded-xl text-center mb-10 shadow-lg">
            <h1 className="text-5xl font-bold mb-4">
              Manage Your Finances Smartly
            </h1>
            <p className="text-lg md:text-xl">
              Track your income, expenses, and achieve your savings goals
              effortlessly!
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a href="/register" className="btn btn-lg btn-primary">
                Get Started
              </a>
              <a href="/login" className="btn btn-lg btn-outline">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  const income = transactions.filter((t) => t.type.toLowerCase() === "income");
  const expense = transactions.filter(
    (t) => t.type.toLowerCase() === "expense"
  );

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="bg-gray-50 min-h-[80vh]">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-yellow-400 text-gray-900 p-12 rounded-xl text-center mb-10 shadow-lg">
          <h1 className="text-5xl font-bold mb-4">
            Manage Your Finances Smartly
          </h1>
          <p className="text-lg md:text-xl">
            Track your income, expenses, and achieve your savings goals
            effortlessly!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Balance
            </h2>
            <p className="text-3xl font-bold mt-2 text-blue-600">${balance}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Income
            </h2>
            <p className="text-3xl font-bold mt-2 text-green-500">
              ${totalIncome}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Expenses
            </h2>
            <p className="text-3xl font-bold mt-2 text-red-500">
              ${totalExpense}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Budgeting Tips!
            </h3>
            <p className="text-gray-700">
              Plan your monthly budget carefully, track expenses, and save for
              future goals. Small daily savings can make a huge difference over
              time!
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Why Financial Planning Matters?
            </h3>
            <p className="text-gray-700">
              Proper financial planning helps you avoid debt, achieve your
              goals, and secure your future. Start today and enjoy peace of mind
              tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
