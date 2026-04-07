import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { Expense, Category } from '../types';
import { expenseService } from '../services/expenseService';
import { categoryService } from '../services/categoryService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, getMonthFromDate } from '../utils/formatters';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';

export const AnalyticsPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(getMonthFromDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [expensesData, categoriesData] = await Promise.all([
        expenseService.getAll(),
        categoryService.getAll(),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#6366F1'];

  // Filter expenses by selected month
  const monthlyExpenses = expenses.filter((e) => getMonthFromDate(e.date) === selectedMonth);

  // Category breakdown
  const categoryData = categories.map((category) => {
    const amount = monthlyExpenses
      .filter((e) => e.categoryId === category.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      name: category.name,
      value: amount,
    };
  }).filter((item) => item.value > 0);

  const totalMonthly = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Statistics
  const avgDaily = monthlyExpenses.length > 0 ? totalMonthly / monthlyExpenses.length : 0;
  const highestCategory = categoryData.length > 0 ? categoryData.reduce((max, cat) => cat.value > max.value ? cat : max) : null;

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner fullScreen />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and analyze your spending patterns</p>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="monthSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Month
          </label>
          <input
            type="month"
            id="monthSelect"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Total Spending</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalMonthly)}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Transactions</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{monthlyExpenses.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Avg per Transaction</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(avgDaily)}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Top Category</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white text-lg">
              {highestCategory ? highestCategory.name : 'N/A'}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        {categoryData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.name || ''} (${(((props.percent || 0) * 100).toFixed(0))}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No expense data available for the selected month</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

