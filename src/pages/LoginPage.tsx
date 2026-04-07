import React from 'react';
import { AuthLayout } from '../components/Layout/AuthLayout';
import { LoginForm } from '../components/Auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
};

