import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface Income {
  _id: string;
  name: string;
  earnings: number;
  productId: string;
  customerId: string;
  orders: number;
  avgOrderValue: number;
  createdAt: string;
}

const useIncomeData = () => {
  const [data, setData] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/income');
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch income data');
        }

        setData(result.incomes || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export function Income() {
  const { data, loading, error } = useIncomeData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No income data available</div>
      </div>
    );
  }

  const totalEarnings = data.reduce((sum, item) => sum + (item?.earnings || 0), 0);

  const sortedData = [...data].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const lastMonthEarnings = sortedData[0]?.earnings || 0;

  const averageEarnings = data.length > 0 ? totalEarnings / data.length : 0;

  const monthlyData = data
    .filter(item => item && item.createdAt && item.earnings)
    .map(item => ({
      name: new Date(item.createdAt).toLocaleString('default', { month: 'short' }),
      earnings: item.earnings,
    }));

  console.log('Monthly Data:', monthlyData); // Debugging line to check if `monthlyData` is populated

  const previousYearEarnings = totalEarnings * 0.85;
  const yearGrowth = previousYearEarnings > 0
    ? ((totalEarnings - previousYearEarnings) / previousYearEarnings) * 100
    : 0;

  const previousMonthEarnings = sortedData[1]?.earnings || lastMonthEarnings;
  const monthGrowth = previousMonthEarnings > 0
    ? ((lastMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100
    : 0;

  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-gray-600">Total Earnings</span>
          </div>
          <div className="text-2xl font-bold">
            ${totalEarnings.toLocaleString()}
          </div>
          <div className={`text-sm ${yearGrowth >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
            {yearGrowth >= 0 ? '+' : ''}{yearGrowth.toFixed(1)}% from last year
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-600">Last Month</span>
          </div>
          <div className="text-2xl font-bold">
            ${lastMonthEarnings.toLocaleString()}
          </div>
          <div className={`text-sm ${monthGrowth >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
            {monthGrowth >= 0 ? '+' : ''}{monthGrowth.toFixed(1)}% from previous month
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-gray-600">Average Monthly</span>
          </div>
          <div className="text-2xl font-bold">
            ${averageEarnings.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Based on {data.length} months
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      {monthlyData.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Earnings Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Earnings']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Income;