
import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredType?: 'user' | 'agent' | 'admin';
};

export const ProtectedRoute = ({ 
  children, 
  requiredType 
}: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('You must be logged in to access this page');
    }
  }, [isLoading, user]);

  if (isLoading) {
    // Show loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pci-600"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if we need to validate user type
  if (requiredType && profile) {
    // For agents, also check if they're approved
    if (requiredType === 'agent' && profile.user_type === 'agent' && !profile.is_approved) {
      return <Navigate to="/pending-approval" replace />;
    }
    
    // If user doesn't have the required type
    if (profile.user_type !== requiredType) {
      // Redirect to appropriate dashboard based on user type
      if (profile.user_type === 'user') {
        navigate('/user-dashboard');
        return null;
      } else if (profile.user_type === 'agent') {
        navigate('/agent-dashboard');
        return null;
      } else if (profile.user_type === 'admin') {
        navigate('/admin-dashboard');
        return null;
      }
      
      // Fallback to home if user type is unexpected
      return <Navigate to="/" replace />;
    }
  }

  // If everything passes, render the children
  return <>{children}</>;
};
