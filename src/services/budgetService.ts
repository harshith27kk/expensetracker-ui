import { apiCall } from './api';
import {
  Budget,
  CreateBudgetRequest,
} from '../types';

export const budgetService = {
  getAll: async (): Promise<Budget[]> => {
    const response = await apiCall.get<Budget[]>('/budgets');
    return response.data;
  },

  getByMonth: async (month: string): Promise<Budget[]> => {
    const response = await apiCall.get<Budget[]>(`/budgets/month/${month}`);
    return response.data;
  },

  getById: async (id: string): Promise<Budget> => {
    const response = await apiCall.get<Budget>(`/budgets/${id}`);
    return response.data;
  },

  create: async (data: CreateBudgetRequest): Promise<Budget> => {
    const response = await apiCall.post<Budget>('/budgets', data);
    return response.data;
  },

  update: async (id: string, data: CreateBudgetRequest): Promise<Budget> => {
    const response = await apiCall.put<Budget>(`/budgets/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiCall.delete(`/budgets/${id}`);
  },
};

