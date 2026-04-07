import { EMAIL_REGEX, PASSWORD_MIN_LENGTH } from './constants';

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  message: string;
} => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      strength: 'weak',
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;

  if (strengthScore >= 3) {
    return { isValid: true, strength: 'strong', message: 'Strong password' };
  } else if (strengthScore >= 2) {
    return { isValid: true, strength: 'medium', message: 'Medium strength password' };
  } else {
    return { isValid: true, strength: 'weak', message: 'Weak password - add uppercase, numbers, and special characters' };
  }
};

export const validateAmount = (amount: string | number): boolean => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0;
};

export const validateDateNotInFuture = (date: string | Date): boolean => {
  const selectedDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate <= today;
};

