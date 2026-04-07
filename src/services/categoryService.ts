import { apiCall } from './api';
import {
  Category,
  CreateCategoryRequest,
} from '../types';

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiCall.get<Category[]>('/categories');
    return response.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await apiCall.get<Category>(`/categories/${id}`);
    return response.data;
  },

  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiCall.post<Category>('/categories', data);
    return response.data;
  },

  update: async (id: string, data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiCall.put<Category>(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiCall.delete(`/categories/${id}`);
  },
};

