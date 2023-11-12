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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(0);
  const [login, setLogin] = useState(true);

  /**
   * Handles the login and moves to home page.
   * @param {Function} e
   *        The event that the login is called with.
   */
  const handleLogin = async (e) => {
    setLoading(2);
    e.preventDefault();
    const values = e.target.elements;
    try {
      await UseLogin(values[0].value, values[1].value);
      setLoading(0);
      navigate('/home');
    } catch (exception) {
      if (exception.response.status === 403) {
        setLoading(0);
        setError('Incorrect username or password.');
        setTimeout(() => {
          setError(null);
        }, 2000);
      } else {
        setError('an error occurred');
        setLoading(0);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };

  /**
   * creates a new account.
   * @param {Function} e
   *        The event that the login is called with.
   */
  const handleCreation = async (e) => {
    setLoading(2);
    e.preventDefault();
    const values = e.target.elements;
    try {
      await UseCreateAccount(
        values[0].value,
        values[1].value,
        values[2].value,
        values[3].value,
        values[5].value,
      );
      setLoading(0);
      navigate('/home');
    } catch (exception) {
      setLoading(0);
      setError('an error occurred');
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const changeView = (from) => {
    if (from === 'login') setLogin(false);
    else setLogin(true);
  };

  return (
    <div className={className} id={id}>
      <div className={`${className}__msg`}>
        if this is your first time using the backend is most likely shutdown.
        Please try to login with random credentials until you get an error message.
        It takes multiple minutes for the backend to wake up.
      </div>
      <LoginForm
        onSubmit={handleLogin}
        errorMessage={error}
        loading={loading}
        view={login}
        setView={changeView}
      />
      <CreateAccountForm
        onSubmit={handleCreation}
        error={error}
        loading={loading}
        view={!login}
        setView={changeView}
      />
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
