import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Budget, Category, CreateBudgetRequest } from '../../types';
import { budgetSchema, BudgetInput } from '../../utils/schemas';

interface BudgetModalProps {
  isOpen: boolean;
  budget?: Budget | null;
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: CreateBudgetRequest) => Promise<void>;
  isLoading?: boolean;
}

export const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  budget,
  categories,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetInput>({
    resolver: zodResolver(budgetSchema) as any,
    defaultValues: budget ? {
      categoryId: budget.categoryId,
      monthlyLimit: budget.monthlyLimit,
      month: budget.month,
    } : {
      categoryId: '',
      monthlyLimit: 0,
      month: new Date().toISOString().slice(0, 7),
    },
  });

  useEffect(() => {
    if (budget) {
      reset({
        categoryId: budget.categoryId,
        monthlyLimit: budget.monthlyLimit,
        month: budget.month,
      });
    }
  }, [budget, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {budget ? 'Edit Budget' : 'Add Budget'}
          </h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data: any) => onSubmit(data as CreateBudgetRequest).then(handleClose))} className="p-6 space-y-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              {...register('categoryId')}
              id="categoryId"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-error">{errors.categoryId.message}</p>}
          </div>

          <div>
            <label htmlFor="monthlyLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Limit
            </label>
            <input
              {...register('monthlyLimit')}
              type="number"
              id="monthlyLimit"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.monthlyLimit && <p className="mt-1 text-sm text-error">{errors.monthlyLimit.message}</p>}
          </div>

          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Month
            </label>
            <input
              {...register('month')}
              type="month"
              id="month"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.month && <p className="mt-1 text-sm text-error">{errors.month.message}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : budget ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

