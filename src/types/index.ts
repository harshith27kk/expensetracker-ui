// Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Expense Types
export interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
  userId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseRequest {
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

export interface UpdateExpenseRequest extends CreateExpenseRequest {
  id: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

// Budget Types
export interface Budget {
  id: string;
  categoryId: string;
  monthlyLimit: number;
  month: string; // YYYY-MM format
  userId?: string;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBudgetRequest {
  categoryId: string;
  monthlyLimit: number;
  month: string;
}

export interface UpdateBudgetRequest {
  id: string;
  categoryId: string;
  monthlyLimit: number;
  month: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string>;
  statusCode: number;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface ExpenseFilters {
  month?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
}

