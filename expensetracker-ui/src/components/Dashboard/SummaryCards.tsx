import React from 'react';
import { TrendingDown, Target, Wallet } from 'lucide-react';
import { Expense, Budget } from '../../types';
import { formatCurrency, getMonthFromDate } from '../../utils/formatters';
import { LoadingSpinner } from '../Common/LoadingSpinner';

interface SummaryCardsProps {
  expenses: Expense[];
  budgets: Budget[];
  isLoading: boolean;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ expenses, budgets, isLoading }) => {
  const currentMonth = getMonthFromDate(new Date());

  const monthlyExpenses = expenses
    .filter((e) => getMonthFromDate(e.date) === currentMonth)
    .reduce((sum, e) => sum + e.amount, 0);

  const monthlyBudgets = budgets
    .filter((b) => b.month === currentMonth)
    .reduce((sum, b) => sum + b.monthlyLimit, 0);

  const remaining = monthlyBudgets - monthlyExpenses;
  const utilization = monthlyBudgets > 0 ? (monthlyExpenses / monthlyBudgets) * 100 : 0;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const cards = [
    {
      title: 'Total Expenses',
      value: formatCurrency(monthlyExpenses),
      icon: TrendingDown,
      color: 'text-error',
      bgColor: 'bg-error bg-opacity-10',
    },
    {
      title: 'Monthly Budget',
      value: formatCurrency(monthlyBudgets),
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10',
    },
    {
      title: 'Remaining',
      value: formatCurrency(Math.max(0, remaining)),
      icon: Wallet,
      color: remaining > 0 ? 'text-success' : 'text-error',
      bgColor: remaining > 0 ? 'bg-success bg-opacity-10' : 'bg-error bg-opacity-10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className={`${card.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <Icon className={`${card.color} w-6 h-6`} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            {card.title === 'Total Expenses' && monthlyBudgets > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${utilization > 100 ? 'bg-error' : 'bg-success'}`}
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {utilization.toFixed(0)}%
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

