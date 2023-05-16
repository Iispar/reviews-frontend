import React from 'react';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';

// eslint-disable-next-line arrow-body-style
const Login = () => {
  return (
    <div className="login-grid">
      <LoginForm />
      <CreateAccountForm />
    </div>
  );
};

export default Login;
