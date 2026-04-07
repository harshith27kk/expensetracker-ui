import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">💰</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400">ExpenseTracker</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

