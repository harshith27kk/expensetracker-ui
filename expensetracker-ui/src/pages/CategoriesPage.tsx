import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { CategoryList } from '../components/Categories/CategoryList';
import { CategoryModal } from '../components/Categories/CategoryModal';
import { Category, Expense, CreateCategoryRequest } from '../types';
import { categoryService } from '../services/categoryService';
import { expenseService } from '../services/expenseService';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [categoriesData, expensesData] = await Promise.all([
        categoryService.getAll(),
        expenseService.getAll(),
      ]);
      setCategories(categoriesData);
      setExpenses(expensesData);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (data: CreateCategoryRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);
      if (editingCategory) {
        const updated = await categoryService.update(editingCategory.id, data);
        setCategories(categories.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const created = await categoryService.create(data);
        setCategories([...categories, created]);
      }
      handleModalClose();
    } catch (err) {
      setError('Failed to save category');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const categoryName = categories.find((c) => c.id === categoryId)?.name;
    const expenseCount = expenses.filter((e) => e.categoryId === categoryId).length;

    if (expenseCount > 0) {
      alert(`Cannot delete category "${categoryName}" - it has ${expenseCount} associated expense(s).`);
      return;
    }

    if (confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      try {
        await categoryService.delete(categoryId);
        setCategories(categories.filter((c) => c.id !== categoryId));
      } catch (err) {
        setError('Failed to delete category');
        console.error(err);
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Organize your expenses by category</p>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {error && (
          <div className="bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <CategoryList
          categories={categories}
          expenses={expenses}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CategoryModal
          isOpen={isModalOpen}
          category={editingCategory}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </MainLayout>
  );
};

