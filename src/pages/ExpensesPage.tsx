import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { ExpenseList } from '../components/Expenses/ExpenseList';
import { ExpenseModal } from '../components/Expenses/ExpenseModal';
import { Expense, Category, CreateExpenseRequest } from '../types';
import { expenseService } from '../services/expenseService';
import { categoryService } from '../services/categoryService';

export const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setError('Failed to load expenses');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleSubmit = async (data: CreateExpenseRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);
      if (editingExpense) {
        const updated = await expenseService.update(editingExpense.id, data);
        setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
      } else {
        const created = await expenseService.create(data);
        setExpenses([created, ...expenses]);
      }
      handleModalClose();
    } catch (err) {
      setError('Failed to save expense');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (expenseId: string) => {
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

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expenses</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your expenses</p>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <ExpenseList
          expenses={expenses}
          categories={categories}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ExpenseModal
          isOpen={isModalOpen}
          expense={editingExpense}
          categories={categories}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </MainLayout>
  );
};

