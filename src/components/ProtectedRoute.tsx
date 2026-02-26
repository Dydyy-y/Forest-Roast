import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode; //ReactNode : type générique de react qui englobe tout ce qui peut être rendu (JSX, string, number, etc.)
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>; // <></> : fragment react qui évite d'ajouter un div inutile dans le DOM
};