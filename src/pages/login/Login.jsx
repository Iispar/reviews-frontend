import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import { UseLogin, UseCreateAccount } from './loginHooks';

/**
 * The login page that combines the login and create account pages.
 * @property {String} className - Custom ClassName if wanted. Default loginGrid.
 * @property {String id - Custom id if wanted. Default loginGrid.
 * @return login page.
 */
const Login = ({ className, id }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  /**
   * Handles the login and moves to home page.
   * @param {Function} e
   *        The event that the login is called with.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    const values = e.target;
    try {
      await UseLogin(values[0].value, values[1].value);
      navigate('/home');
    } catch (exception) {
      if (exception.response.status === 403) setLoginError('Incorrect username or password.');
    }
  };

  /**
   * creates a new account.
   * @param {Function} e
   *        The event that the login is called with.
   */
  const handleCreation = async (e) => {
    e.preventDefault();
    const values = e.target;
    if (await UseCreateAccount(
      values[0].value,
      values[1].value,
      values[2].value,
      values[3].value,
      values[5].value,
    )) navigate('/home');
  };

  return (
    <div className={className} id={id}>
      <LoginForm onSubmit={handleLogin} errorMessage={loginError} />
      <CreateAccountForm onSubmit={handleCreation} />
    </div>
  );
};

Login.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Login.defaultProps = {
  className: 'loginGrid',
  id: 'loginGrid',
};

export default Login;
