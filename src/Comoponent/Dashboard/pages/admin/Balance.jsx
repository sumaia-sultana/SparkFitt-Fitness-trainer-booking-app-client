import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadSpinner from '../../../Shared/LoadSpinner';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Balance = () => {
    const axiosSecure = useAxiosSecure();

  // Fetch all payment data
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    },
  });

  // Fetch subscriber and paid member counts
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ['memberStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/member-stats');
      return res.data;
    },
  });

  if (paymentsLoading || statsLoading) return <LoadSpinner />;

  // Calculate total balance
  const totalBalance = payments.reduce((sum, curr) => sum + Number(curr.price), 0);

  // Get last 6 transactions
  const lastSixTransactions = [...payments].reverse().slice(0, 6);

  // Prepare chart data
  const chartData = [
    { name: 'Subscribers', value: stats.totalSubscribers || 0 },
    { name: 'Paid Members', value: stats.totalPaidMembers || 0 }
  ];

  const COLORS = ['#8884d8', '#82ca9d'];

    return (
        <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">💰 Admin Balance Overview</h2>

      {/* Total Balance */}
      <div className="bg-white p-4 rounded shadow w-full max-w-sm">
        <h3 className="text-lg font-medium">Total Remaining Balance</h3>
        <p className="text-3xl font-bold text-green-600">${totalBalance.toFixed(2)}</p>
      </div>

      {/* Last 6 Transactions */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🧾 Last 6 Booking Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">User</th>
                <th className="p-2 border">Trainer</th>
                <th className="p-2 border">Slot</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {lastSixTransactions.map((tx, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2 border">{tx.userName}</td>
                  <td className="p-2 border">{tx.trainerName}</td>
                  <td className="p-2 border">{tx.slotName}</td>
                  <td className="p-2 border text-green-600">${tx.price}</td>
                  <td className="p-2 border">{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">📊 Subscribers vs Paid Members (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">📈 Subscribers vs Paid Members (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    );
};

export default Balance;