import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .refine(
        (pwd) => /[A-Z]/.test(pwd),
        'Password must contain at least one uppercase letter'
      )
      .refine(
        (pwd) => /[a-z]/.test(pwd),
        'Password must contain at least one lowercase letter'
      )
      .refine(
        (pwd) => /\d/.test(pwd),
        'Password must contain at least one number'
      ),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const expenseSchema = z.object({
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  description: z.string().max(255, 'Description must not exceed 255 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  date: z.string().refine(
    (date) => new Date(date) <= new Date(),
    'Date cannot be in the future'
  ),
});

export const categorySchema = z.object({
  name: z.string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must not exceed 100 characters'),
});

export const budgetSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  monthlyLimit: z.coerce.number().positive('Monthly limit must be greater than 0'),
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ExpenseInput = z.infer<typeof expenseSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type BudgetInput = z.infer<typeof budgetSchema>;

