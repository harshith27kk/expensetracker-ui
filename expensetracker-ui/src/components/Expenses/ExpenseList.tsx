import React from 'react';
import { Expense, Category } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Trash2, Edit2 } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
  isLoading: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  categories,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">No expenses found. Start tracking your spending!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Description</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Category</th>
              <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Amount</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-4 px-6 text-gray-900 dark:text-gray-100">{formatDate(expense.date)}</td>
                <td className="py-4 px-6 text-gray-900 dark:text-gray-100">{expense.description}</td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                  {categoryMap[expense.categoryId] || 'Unknown'}
                </td>
                <td className="py-4 px-6 text-right font-semibold text-gray-900 dark:text-gray-100">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-2 text-primary hover:bg-primary hover:bg-opacity-10 rounded transition"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="p-2 text-error hover:bg-error hover:bg-opacity-10 rounded transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

