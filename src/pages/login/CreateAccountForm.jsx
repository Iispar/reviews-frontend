import React from 'react';
import $ from 'jquery';
import SearchInput from '../../components/SearchInput';

const CreateAccountForm = () => {
  const changeView = () => {
    $('#loginForm').css('display', 'flex');
    $('#createAccountForm').css('display', 'none');
  };
  return (
    <div className="createAccountForm" id="createAccountForm">
      <div className="createAccountForm__header"> Create account </div>
      <div className="createAccountForm__inputs">
        <form className="createAccountForm__inputs__form">
          <SearchInput title="username" />
          <SearchInput title="name" />
          <SearchInput title="password" />
          <SearchInput title="confirm password" />
          <button type="submit"> submit </button>
        </form>
      </div>
      <div className="createAccountForm__login">
        Already have an account?
        <span className="loginForm__createAccount__button" role="button" tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Login </span>
      </div>
    </div>
  );
};

export default CreateAccountForm;
