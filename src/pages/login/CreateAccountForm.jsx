import React from 'react';
import $ from 'jquery';
import InputField from '../../components/InputField';
import useCreateAccount from './useCreateAccount';

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
    $('#createNew__createAccountForm__inputs__form').trigger('reset');
  };

  const createAccount = (e) => {
    e.preventDefault();
    const values = e.target;
    if (useCreateAccount(
      values[0].value,
      values[1].value,
      values[2].value,
      values[3].value,
      values[4].value,
    ));
  };
  return (
    <div className="createNew" id="createNew">
      <div className="createNew__createAccountForm">
        <div className="createNew__createAccountForm__header"> Create account </div>
        <div className="createNew__createAccountForm__inputs">
          <form className="createNew__createAccountForm__inputs__form" id="createNew__createAccountForm__inputs__form" onSubmit={(e) => createAccount(e)}>
            <InputField id="createUsername" title="username" width="280px" />
            <InputField id="createName" title="name" width="280px" />
            <InputField id="createEmail" title="email" width="280px" />
            <InputField id="createPassword" type="password" title="password" width="280px" />
            <InputField id="createConfirmPassword" type="password" title="confirm password" width="280px" />
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
