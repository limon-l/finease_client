import { useAuth } from "../context/AuthContext1";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Banner Section */}
      <div className="bg-primary text-white p-8 rounded-lg text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Manage Your Finances Smartly 💰
        </h1>
        <p className="text-lg">
          Track income, expenses, and reach your savings goals!
        </p>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow-md p-4 text-center">
          <h2 className="text-xl font-semibold">Total Balance</h2>
          <p className="text-2xl mt-2">$0</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4 text-center">
          <h2 className="text-xl font-semibold">Total Income</h2>
          <p className="text-2xl mt-2">$0</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4 text-center">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <p className="text-2xl mt-2">$0</p>
        </div>
      </div>

      {/* Static Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">Budgeting Tips</h3>
          <p>
            Plan your monthly budget carefully, track expenses, and save for
            future goals.
          </p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">
            Why Financial Planning Matters
          </h3>
          <p>
            Financial planning helps you avoid debt, achieve goals, and secure
            your future.
          </p>
        </div>
      </div>
    </div>
  );
}
