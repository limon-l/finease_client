import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext1";
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
          `http://localhost:5173/transactions?email=${user.email}`
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

  const income = Array.isArray(transactions)
    ? transactions.filter((t) => t.type === "Income")
    : [];
  const expense = Array.isArray(transactions)
    ? transactions.filter((t) => t.type === "Expense")
    : [];

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📊 Financial Report</h2>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Income</div>
          <div className="stat-value text-green-500">${totalIncome}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Expense</div>
          <div className="stat-value text-red-500">${totalExpense}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Net Balance</div>
          <div className="stat-value text-blue-500">${balance}</div>
        </div>
      </div>
    </div>
  );
}
