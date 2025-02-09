import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const monthlyData = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 5500 },
  { name: 'Mar', earnings: 4800 },
  { name: 'Apr', earnings: 6000 },
  { name: 'May', earnings: 7200 },
  { name: 'Jun', earnings: 8500 },
];

export function Income() {
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
          <div className="text-2xl font-bold">$45,231</div>
          <div className="text-sm text-green-600 mt-1">+18% from last year</div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-600">Last Month</span>
          </div>
          <div className="text-2xl font-bold">$8,500</div>
          <div className="text-sm text-green-600 mt-1">+12% from previous month</div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-gray-600">Average Monthly</span>
          </div>
          <div className="text-2xl font-bold">$6,000</div>
          <div className="text-sm text-gray-600 mt-1">Based on last 6 months</div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Earnings Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={{ fill: '#4F46E5' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Income;