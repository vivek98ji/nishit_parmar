import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, ShoppingBag, TrendingUp, Calendar, Store } from 'lucide-react';

const Income = () => {
  // Hardcoded data for demonstration
  const monthlyData = [
    { month: 'Jan', earnings: 45000, users: 1200, providers: 85 },
    { month: 'Feb', earnings: 52000, users: 1350, providers: 92 },
    { month: 'Mar', earnings: 48000, users: 1480, providers: 98 },
    { month: 'Apr', earnings: 61000, users: 1600, providers: 105 },
    { month: 'May', earnings: 58000, users: 1750, providers: 110 },
    { month: 'Jun', earnings: 65000, users: 1900, providers: 118 }
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const calculateGrowth = (current: number, previous: number) => {
    return previous ? ((current - previous) / previous) * 100 : 0;
  };

  const earningsGrowth = calculateGrowth(currentMonth.earnings, previousMonth.earnings);
  const usersGrowth = calculateGrowth(currentMonth.users, previousMonth.users);
  const providersGrowth = calculateGrowth(currentMonth.providers, previousMonth.providers);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${currentMonth.earnings.toLocaleString()}`,
      growth: earningsGrowth,
      icon: DollarSign,
      color: "blue",
      metric: "/month"
    },
    {
      title: "Active Users",
      value: currentMonth.users.toLocaleString(),
      growth: usersGrowth,
      icon: Users,
      color: "green",
      metric: "users"
    },
    {
      title: "Service Providers",
      value: currentMonth.providers.toLocaleString(),
      growth: providersGrowth,
      icon: Store,
      color: "purple",
      metric: "providers"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className={`bg-${stat.color}-100 p-2 rounded-full mr-3`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
              <span className="text-gray-600">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center mt-2">
              <span className={`text-sm ${stat.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.growth >= 0 ? '↑' : '↓'} {Math.abs(stat.growth).toFixed(1)}%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `$${(value/1000)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users & Providers Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Users & Providers Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }}
                  yAxisId="left"
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="users" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="providers" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;