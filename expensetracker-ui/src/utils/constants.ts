// Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'user';

// Date formats
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_DATE_FORMAT = 'MMM dd, yyyy';
export const MONTH_FORMAT = 'yyyy-MM';

// Validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 8;

// API Timeouts
export const API_TIMEOUT = 30000;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

