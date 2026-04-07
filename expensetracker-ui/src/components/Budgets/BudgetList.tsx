import React from 'react';
import { Budget, Category, Expense } from '../../types';
import { formatCurrency, formatMonth, formatPercentage } from '../../utils/formatters';
import { Trash2, Edit2, AlertCircle, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '../Common/LoadingSpinner';

interface BudgetListProps {
  budgets: Budget[];
  categories: Category[];
  expenses: Expense[];
  isLoading: boolean;
  onEdit: (budget: Budget) => void;
  onDelete: (budgetId: string) => void;
}

export const BudgetList: React.FC<BudgetListProps> = ({
  budgets,
  categories,
  expenses,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const getBudgetSpending = (budget: Budget): number => {
    return expenses
      .filter((e) => e.categoryId === budget.categoryId && e.date.startsWith(budget.month))
      .reduce((sum, e) => sum + e.amount, 0);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (budgets.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">No budgets set. Create one to manage your spending!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {budgets.map((budget) => {
        const spending = getBudgetSpending(budget);
        const remaining = budget.monthlyLimit - spending;
        const utilization = (spending / budget.monthlyLimit) * 100;
        const isOverBudget = utilization > 100;

        return (
          <div
            key={budget.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 ${
              isOverBudget ? 'border-l-error' : 'border-l-success'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {categoryMap[budget.categoryId] || 'Unknown'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{formatMonth(budget.month)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(budget)}
                  className="p-2 text-primary hover:bg-primary hover:bg-opacity-10 rounded transition"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(budget.id)}
                  className="p-2 text-error hover:bg-error hover:bg-opacity-10 rounded transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Budget: {formatCurrency(budget.monthlyLimit)}</span>
                  <span className={`font-medium ${isOverBudget ? 'text-error' : 'text-success'}`}>
                    Spent: {formatCurrency(spending)}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isOverBudget ? 'bg-error' : 'bg-success'}`}
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {isOverBudget ? 'Exceeded' : 'Remaining'}
                </span>
                <div className="flex items-center gap-2">
                  {isOverBudget ? (
                    <AlertCircle className="w-4 h-4 text-error" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-success" />
                  )}
                  <span className={`font-semibold ${isOverBudget ? 'text-error' : 'text-success'}`}>
                    {formatCurrency(Math.abs(remaining))}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Utilization</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPercentage(Math.min(utilization / 100, 1))}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

