import { format, parseISO } from 'date-fns';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT, MONTH_FORMAT } from './constants';

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, DISPLAY_DATE_FORMAT);
  } catch {
    return 'Invalid date';
  }
};

export const formatDateForInput = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, DATE_FORMAT);
  } catch {
    return '';
  }
};

export const formatMonth = (month: string): string => {
  try {
    const dateObj = parseISO(`${month}-01`);
    return format(dateObj, 'MMMM yyyy');
  } catch {
    return month;
  }
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const getMonthFromDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, MONTH_FORMAT);
  } catch {
    return '';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

