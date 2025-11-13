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
      <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-[1200px] mx-auto p-6">
          <div className="bg-yellow-400 text-gray-900 p-12 rounded-2xl text-center shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Manage Your Finances Smartly
            </h1>
            <p className="text-lg md:text-xl">
              Track your income, expenses, and achieve your savings goals
              effortlessly!
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <a
                href="/register"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition">
                Get Started
              </a>
              <a
                href="/login"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 transition">
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
  const recentTransactions = transactions.slice(-3).reverse();

  return (
    <div className="bg-gray-50 min-h-[80vh] py-10 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-yellow-400 text-gray-900 p-12 rounded-2xl text-center shadow-2xl mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recent Transactions
          </h2>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow">
            {recentTransactions.length === 0 ? (
              <p className="text-gray-600">No recent transactions found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentTransactions.map((t) => (
                  <li
                    key={t._id}
                    className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {t.category}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t.description || "-"}
                      </p>
                    </div>
                    <div
                      className={`font-bold ${
                        t.type === "income" ? "text-green-500" : "text-red-500"
                      }`}>
                      ${t.amount}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Savings Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Emergency Fund
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{
                    width: `${Math.min((totalIncome / 1000) * 100, 100)}%`,
                  }}></div>
              </div>
              <p className="text-gray-600 text-sm">Target: $1000</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Vacation Fund
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{
                    width: `${Math.min((totalIncome / 500) * 100, 100)}%`,
                  }}></div>
              </div>
              <p className="text-gray-600 text-sm">Target: $500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
