import React from 'react';
import { Category, Expense } from '../../types';
import { Trash2, Edit2 } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';

interface CategoryListProps {
  categories: Category[];
  expenses: Expense[];
  isLoading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  expenses,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const getCategoryExpenseCount = (categoryId: string): number => {
    return expenses.filter((e) => e.categoryId === categoryId).length;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">No categories yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const expenseCount = getCategoryExpenseCount(category.id);
        return (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {expenseCount} expense{expenseCount !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(category)}
                  className="p-2 text-primary hover:bg-primary hover:bg-opacity-10 rounded transition"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  className="p-2 text-error hover:bg-error hover:bg-opacity-10 rounded transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Created {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'Recently'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

