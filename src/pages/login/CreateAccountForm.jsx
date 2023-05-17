import React from 'react';
import $ from 'jquery';
import InputField from '../../components/InputField';

/**
 * creates the create accoun form.
 * @returns create account form
 */
const CreateAccountForm = () => {
  /**
   * changes view between create account and login view.
   */
  const changeView = () => {
    $('#login').css('display', 'flex');
    $('#createNew').css('display', 'none');
  };
  return (
    <div className="createNew" id="createNew">
      <div className="createNew__createAccountForm">
        <div className="createNew__createAccountForm__header"> Create account </div>
        <div className="createNew__createAccountForm__inputs">
          <form className="createNew__createAccountForm__inputs__form" id="createNew__createAccountForm__inputs__form">
            <InputField title="username" width="280px" />
            <InputField title="name" width="280px" />
            <InputField title="password" width="280px" />
            <InputField title="confirm password" width="280px" />
          </form>
          <button className="createNew__createAccountForm__inputs__submit" type="submit" form="createNew__createAccountForm__inputs__form"> submit </button>
        </div>
      </div>
      <div className="createNew__login">
        Already have an account?&nbsp;
        <span className="createNew__login__button" role="button" tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Login </span>
      </div>
    </div>
  );
};

export default CreateAccountForm;
