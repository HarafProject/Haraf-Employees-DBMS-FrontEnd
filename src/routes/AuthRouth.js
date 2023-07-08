import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ element: Component, isAuthenticated, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to={redirectTo} replace />}
    />
  );
};

export default AuthRoute;
