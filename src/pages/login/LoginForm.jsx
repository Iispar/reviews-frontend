import $ from 'jquery';
import React from 'react';
import InputField from '../../components/InputField';

/**
 * creates the sign in form.
 * @returns login and sign in view.
 */
const LoginForm = () => {
  /**
   * changes view between login form and create account form.
   *
   */
  const changeView = () => {
    $('#login').css('display', 'none');
    $('#createNew').css('display', 'flex');
  };

  return (
    <div className="login" id="login">
      <div className="login__loginForm">
        <div className="login__loginForm__header"> Login </div>
        <div className="login__loginForm__inputs">
          <form className="login__loginForm__inputs__form" id="loginForm__inputs__form">
            <InputField title="username" width="280px" />
            <InputField title="password" width="280px" />
          </form>
          <button type="button" className="login__loginForm__inputs__forgotPassword"> Forgot password? </button>
          <button type="submit" className="login__loginForm__inputs__login" form="loginForm__inputs__form"> login </button>
        </div>
      </div>
      <div className="login__createAccount">
        Don&apos;t have an account?&nbsp;
        <span className="login__createAccount__button" role="button" tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Create new </span>
      </div>
    </div>
  );
};

export default LoginForm;
