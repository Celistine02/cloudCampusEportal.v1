import { Navigate } from "react-router-dom";
import useAuthStore from './../production/zustand/auth/authStore';
import useTeacherStore from './../production/zustand/auth/teacherstore';

const ProtectedRoute = ({ children }) => {
  const { token: authToken } = useAuthStore(); // Access the token from the Auth Zustand store
  const { token: teacherToken } = useTeacherStore(); // Access the token from the Teacher Zustand store

  // If the user is not authenticated in either store, redirect to the login page
  if (!authToken && !teacherToken) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the children (protected page)
  return children;
};

export default ProtectedRoute;
