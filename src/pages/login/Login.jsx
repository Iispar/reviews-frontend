import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import { UseLogin, UseCreateAccount } from './loginHooks';

/**
 * combines the login and create account pages.
 * @returns login page
 */
const Login = () => {
  const navigate = useNavigate();
  /**
   * Handles the login and moves to home page.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    const values = e.target;
    if (await UseLogin(values[0].value, values[1].value)) navigate('/home');
  };

  /**
   * creates a new account.
   * @param username, password, email, name
   */
  const handleCreation = async (e) => {
    e.preventDefault();
    const values = e.target;
    if (await UseCreateAccount(
      values[0].value,
      values[1].value,
      values[2].value,
      values[3].value,
      values[4].value,
    )) window.location.reload();
  };
  return (
    <div className="login-grid">
      <LoginForm onSubmit={handleLogin} />
      <CreateAccountForm onSubmit={handleCreation} />
    </div>
  );
};

export default Login;
