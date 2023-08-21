import React from 'react';
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
const Login = (props) => {
  const { className } = props;
  const { id } = props;
  const navigate = useNavigate();

  /**
   * Handles the login and moves to home page.
   * @param {*} e
   *        The event that the login is called with.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    const values = e.target;
    if (await UseLogin(values[0].value, values[1].value)) navigate('/home');
  };

  /**
   * creates a new account.
   * @param {*} e
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

  /**
   * formats the email request and calls the new pass hook.
   * @param {*} e
   *        The event called with the form submit.
   */
  const handlePassword = (e) => {
    e.preventDefault();
    // const values = e.target;
    // if (UseNewPassword(values[0].value)) console.log('success');
    // else console.log('failure');
  };

  return (
    <div className={className} id={id}>
      <LoginForm onSubmit={handleLogin} newPass={handlePassword} />
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
