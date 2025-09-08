import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ManageReports = () => {
  // Dropdown state
  const [filter, setFilter] = useState("month");

  // Dummy Monthly Data
  const monthlySalesData = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 200 },
    { month: "Mar", sales: 150 },
    { month: "Apr", sales: 300 },
    { month: "May", sales: 250 },
    { month: "Jun", sales: 400 },
  ];

  const monthlyRevenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 6500 },
    { month: "Apr", revenue: 8000 },
    { month: "May", revenue: 7500 },
    { month: "Jun", revenue: 9000 },
  ];

  const monthlyUsersData = [
    { month: "Jan", users: 100 },
    { month: "Feb", users: 200 },
    { month: "Mar", users: 300 },
    { month: "Apr", users: 450 },
    { month: "May", users: 600 },
    { month: "Jun", users: 800 },
  ];

  // Dummy Yearly Data
  const yearlySalesData = [
    { year: "2020", sales: 1500 },
    { year: "2021", sales: 2200 },
    { year: "2022", sales: 1800 },
    { year: "2023", sales: 3000 },
    { year: "2024", sales: 2700 },
  ];

  const yearlyRevenueData = [
    { year: "2020", revenue: 45000 },
    { year: "2021", revenue: 60000 },
    { year: "2022", revenue: 52000 },
    { year: "2023", revenue: 80000 },
    { year: "2024", revenue: 70000 },
  ];

  const yearlyUsersData = [
    { year: "2020", users: 1200 },
    { year: "2021", users: 2500 },
    { year: "2022", users: 4000 },
    { year: "2023", users: 6500 },
    { year: "2024", users: 9000 },
  ];

  // ✅ Only profit OR loss
  const profitValue = -2000; // example: negative = loss, positive = profit

  // Select data based on filter
  const salesData = filter === "month" ? monthlySalesData : yearlySalesData;
  const revenueData =
    filter === "month" ? monthlyRevenueData : yearlyRevenueData;
  const usersData = filter === "month" ? monthlyUsersData : yearlyUsersData;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>

        {/* Dropdown for Month / Year */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 text-gray-700 shadow-sm"
        >
          <option value="month">Month Wise</option>
          <option value="year">Year Wise</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-gray-600 text-lg">Total Sales</h3>
          <p className="text-2xl font-bold">
            {filter === "month" ? "1420" : "11,200"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-gray-600 text-lg">Total Revenue</h3>
          <p className="text-2xl font-bold">
            {filter === "month" ? "₹43,000" : "₹3,07,000"}
          </p>
        </div>

        {/* ✅ Profit OR Loss */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          {profitValue > 0 ? (
            <>
              <h3 className="text-gray-600 text-lg">Profit</h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{profitValue}
              </p>
            </>
          ) : profitValue < 0 ? (
            <>
              <h3 className="text-gray-600 text-lg">Loss</h3>
              <p className="text-2xl font-bold text-red-600">
                ₹{Math.abs(profitValue)}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-gray-600 text-lg">Break-even</h3>
              <p className="text-2xl font-bold text-gray-600">₹0</p>
            </>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-gray-600 text-lg">Customers</h3>
          <p className="text-2xl font-bold">
            {filter === "month" ? "520" : "10,200"}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {filter === "month" ? "Monthly Sales" : "Yearly Sales"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={filter === "month" ? "month" : "year"} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {filter === "month"
              ? "Revenue Trend (Monthly)"
              : "Revenue Trend (Yearly)"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={filter === "month" ? "month" : "year"} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Users Growth Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">
            {filter === "month"
              ? "User Growth (Monthly)"
              : "User Growth (Yearly)"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={usersData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey={filter === "month" ? "month" : "year"} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ManageReports;
