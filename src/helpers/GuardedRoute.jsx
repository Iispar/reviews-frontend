import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Checks if user is logged in when entering page and redirects to login if not.
 * @returns login page if not logged in, outlet page otherwise
 */
const GuardedRoute = () => {
  const loggedIn = window.localStorage.getItem('token') != null;
  return (
    loggedIn ? <Outlet /> : <Navigate to="/login" />
  );
};

export default GuardedRoute;
