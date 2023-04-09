import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function GuardedRoute({ children, isAuth }: { children: JSX.Element, isAuth: boolean }) {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}

export default GuardedRoute;
