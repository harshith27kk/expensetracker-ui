import React from 'react';
import { Expense, Category } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Trash2, Edit2 } from 'lucide-react';

interface RecentExpensesProps {
  expenses: Expense[];
  categories: Category[];
  isLoading: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
}

export const RecentExpenses: React.FC<RecentExpensesProps> = ({
  expenses,
  categories,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  // Get last 10 expenses, sorted by date (newest first)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (recentExpenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Expenses</h3>
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">No expenses yet. Start tracking!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Expenses</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="text-left py-2 px-2 font-semibold text-gray-700 dark:text-gray-300">Date</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700 dark:text-gray-300">Description</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700 dark:text-gray-300">Category</th>
              <th className="text-right py-2 px-2 font-semibold text-gray-700 dark:text-gray-300">Amount</th>
              <th className="text-center py-2 px-2 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-3 px-2 text-gray-900 dark:text-gray-100">{formatDate(expense.date)}</td>
                <td className="py-3 px-2 text-gray-900 dark:text-gray-100">{expense.description}</td>
                <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                  {categoryMap[expense.categoryId] || 'Unknown'}
                </td>
                <td className="py-3 px-2 text-right font-semibold text-gray-900 dark:text-gray-100">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="py-3 px-2 text-center flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="p-1 text-primary hover:bg-primary hover:bg-opacity-10 rounded transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="p-1 text-error hover:bg-error hover:bg-opacity-10 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

