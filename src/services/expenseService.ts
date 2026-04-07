import { apiCall } from './api';
import {
  Expense,
  CreateExpenseRequest,
  ExpenseFilters,
} from '../types';

export const expenseService = {
  getAll: async (filters?: ExpenseFilters): Promise<Expense[]> => {
    const response = await apiCall.get<Expense[]>('/expenses', {
      params: filters,
    });
    return response.data;
  },

  getById: async (id: string): Promise<Expense> => {
    const response = await apiCall.get<Expense>(`/expenses/${id}`);
    return response.data;
  },

  create: async (data: CreateExpenseRequest): Promise<Expense> => {
    const response = await apiCall.post<Expense>('/expenses', data);
    return response.data;
  },

  update: async (id: string, data: CreateExpenseRequest): Promise<Expense> => {
    const response = await apiCall.put<Expense>(`/expenses/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiCall.delete(`/expenses/${id}`);
  },
};

