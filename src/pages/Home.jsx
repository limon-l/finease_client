import { useAuth } from "../context/AuthContext1";

export default function Home() {
  const { user } = useAuth();

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
          {!user && (
            <div className="mt-6 flex justify-center gap-4">
              <a href="/register" className="btn btn-lg btn-primary">
                Get Started
              </a>
              <a href="/login" className="btn btn-lg btn-outline">
                Login
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Balance
            </h2>
            <p className="text-3xl font-bold mt-2 text-green-500">$0</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Income
            </h2>
            <p className="text-3xl font-bold mt-2 text-green-500">$0</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Expenses
            </h2>
            <p className="text-3xl font-bold mt-2 text-green-500">$0</p>
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
