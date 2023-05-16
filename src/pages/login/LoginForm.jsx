import $ from 'jquery';
import React from 'react';
import SearchInput from '../../components/SearchInput';

const LoginForm = () => {
  const changeView = () => {
    $('#loginForm').css('display', 'none');
    $('#createAccountForm').css('display', 'flex');
  };

  return (
    <div className="loginForm" id="loginForm">
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
        <span className="loginForm__createAccount__button" role="button" tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Create new </span>
      </div>
    </div>
  );
};

export default LoginForm;
