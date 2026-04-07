import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { SummaryCards } from '../components/Dashboard/SummaryCards';
import { RecentExpenses } from '../components/Dashboard/RecentExpenses';
import { ExpenseChart } from '../components/Dashboard/ExpenseChart';
import { Expense, Budget, Category } from '../types';
import { expenseService } from '../services/expenseService';
import { budgetService } from '../services/budgetService';
import { categoryService } from '../services/categoryService';

export const DashboardPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [expensesData, budgetsData, categoriesData] = await Promise.all([
        expenseService.getAll(),
        budgetService.getAll(),
        categoryService.getAll(),
      ]);
      setExpenses(expensesData);
      setBudgets(budgetsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.delete(expenseId);
        setExpenses(expenses.filter((e) => e.id !== expenseId));
      } catch (err) {
        setError('Failed to delete expense');
        console.error(err);
      }
    }
  };

  const handleEditExpense = (expense: Expense) => {
    // This would open an edit modal/navigate to edit page
    console.log('Edit expense:', expense);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <SummaryCards expenses={expenses} budgets={budgets} isLoading={isLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExpenseChart expenses={expenses} isLoading={isLoading} />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Expenses (All Time)</span>
                <span className="font-semibold text-lg text-gray-900 dark:text-white">
                  ${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Number of Categories</span>
                <span className="font-semibold text-lg text-gray-900 dark:text-white">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Active Budgets</span>
                <span className="font-semibold text-lg text-gray-900 dark:text-white">{budgets.length}</span>
              </div>
            </div>
          </div>
        </div>

        <RecentExpenses
          expenses={expenses}
          categories={categories}
          isLoading={isLoading}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
    </MainLayout>
  );
};

