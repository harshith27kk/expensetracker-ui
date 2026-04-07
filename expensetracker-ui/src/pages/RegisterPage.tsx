import React from 'react';
import { AuthLayout } from '../components/Layout/AuthLayout';
import { RegisterForm } from '../components/Auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout title="Create Account">
      <RegisterForm />
    </AuthLayout>
  );
};

