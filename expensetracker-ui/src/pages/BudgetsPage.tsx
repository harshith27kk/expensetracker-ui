import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { BudgetList } from '../components/Budgets/BudgetList';
import { BudgetModal } from '../components/Budgets/BudgetModal';
import { Budget, Category, Expense, CreateBudgetRequest } from '../types';
import { budgetService } from '../services/budgetService';
import { categoryService } from '../services/categoryService';
import { expenseService } from '../services/expenseService';

export const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [budgetsData, categoriesData, expensesData] = await Promise.all([
        budgetService.getAll(),
        categoryService.getAll(),
        expenseService.getAll(),
      ]);
      setBudgets(budgetsData);
      setCategories(categoriesData);
      setExpenses(expensesData);
    } catch (err) {
      setError('Failed to load budgets');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const handleSubmit = async (data: CreateBudgetRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);
      if (editingBudget) {
        const updated = await budgetService.update(editingBudget.id, data);
        setBudgets(budgets.map((b) => (b.id === updated.id ? updated : b)));
      } else {
        const created = await budgetService.create(data);
        setBudgets([...budgets, created]);
      }
      handleModalClose();
    } catch (err) {
      setError('Failed to save budget');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (budgetId: string) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      try {
        await budgetService.delete(budgetId);
        setBudgets(budgets.filter((b) => b.id !== budgetId));
      } catch (err) {
        setError('Failed to delete budget');
        console.error(err);
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budgets</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Set and manage your spending budgets</p>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            <Plus className="w-5 h-5" />
            Add Budget
          </button>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <BudgetList
          budgets={budgets}
          categories={categories}
          expenses={expenses}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <BudgetModal
          isOpen={isModalOpen}
          budget={editingBudget}
          categories={categories}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </MainLayout>
  );
};

