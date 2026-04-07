import React, { useState, useEffect } from 'react';
import { Expense } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonthFromDate } from '../../utils/formatters';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface ExpenseChartProps {
  expenses: Expense[];
  isLoading: boolean;
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses, isLoading }) => {
  const [dailyData, setDailyData] = useState<Array<{ date: string; amount: number }>>([]);

  useEffect(() => {
    const currentMonth = new Date();
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    const dataMap: Record<string, number> = {};
    days.forEach((day) => {
      dataMap[format(day, 'yyyy-MM-dd')] = 0;
    });

    expenses
      .filter((e) => getMonthFromDate(e.date) === getMonthFromDate(new Date()))
      .forEach((expense) => {
        const dateStr = expense.date;
        if (dataMap[dateStr] !== undefined) {
          dataMap[dateStr] += expense.amount;
        }
      });

    const chartData = Object.entries(dataMap).map(([date, amount]) => ({
      date: format(parseISO(date), 'MMM dd'),
      amount,
    }));

    setDailyData(chartData);
  }, [expenses]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Expenses Trend</h3>
      {dailyData.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">No expense data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
              name="Daily Spending"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

