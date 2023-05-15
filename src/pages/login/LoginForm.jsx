import React from 'react';
import SearchInput from '../../components/SearchInput';

// eslint-disable-next-line arrow-body-style
const LoginForm = () => {
  return (
    <div className="loginForm">
      <div className="loginForm__header"> Login </div>
      <div className="loginForm__inputs">
        <form className="loginForm__inputs__form">
          <SearchInput title="username" />
          <SearchInput title="password" />
          <button type="button" className="loginForm__inputs__form__forgotPassword"> Forgot password? </button>
          <button type="submit"> login </button>
        </form>
      </div>
      <div className="loginForm__createAccount">
        Don&apos;t have an account?
        <span className="loginForm__createAccount__button"> Create new </span>
      </div>
    </div>
  );
};

export default LoginForm;
