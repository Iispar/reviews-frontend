import { useState, React } from 'react';
import $ from 'jquery';
import InputField from '../../components/InputField';
import useCreateAccount from './useCreateAccount';

/**
 * creates the create accoun form.
 * @returns create account form
 */
const CreateAccountForm = () => {
  const [password, setPassword] = useState('null');
  const [confirmPassword, setConfirmPassword] = useState('null');
  /**
   * changes view between create account and login view.
   */
  const changeView = () => {
    $('#login').css('display', 'flex');
    $('#createNew').css('display', 'none');
    $('#createNew__createAccountForm__inputs__form').trigger('reset');
  };

  /**
   * Informs the user of a succesful login. Also resets the form and moves to login page.
   */
  const succesfulCreation = () => {
    $('#createNew__createAccountForm__inputs__form').trigger('reset');
    console.log('succesful creation');
    changeView();
  };

  /**
   * creates a new account.
   * @param username, password, email, name
   */
  const createAccount = (e) => {
    e.preventDefault();
    const values = e.target;
    if (useCreateAccount(
      values[0].value,
      values[1].value,
      values[2].value,
      values[3].value,
      values[4].value,
    )) succesfulCreation();
  };

  /**
   * Loads listeners to input fields when the app loads fully.
   */
  $(document).ready(() => {
    /**
     * Checks the email is the correct format
     */
    $('#createEmail').on('change', (val) => {
      const string = val.target.value;
      const regex = /^\w*@\w*\..\w*/;
      if (regex.test(string)) console.log('true');
      else console.log('needs to be format email@something.com');
    });

    /**
     * Checks the passwords match
     */
    $('#createPassword').on('change', (val) => {
      const input = val.target.value;
      setPassword(input);
      if (input !== confirmPassword) console.log('passwords don\'t match');
      else console.log('passwords match');
    });

    /**
     * Checks the passwords match.
     */
    $('#createConfirmPassword').on('change', (val) => {
      const input = val.target.value;
      setConfirmPassword(input);
      if (input !== password) console.log('passwords don\'t match');
      else console.log('passwords match');
    });
  });

  return (
    <div className="createNew" id="createNew">
      <div className="createNew__createAccountForm">
        <div className="createNew__createAccountForm__header"> Create account </div>
        <div className="createNew__createAccountForm__inputs">
          <form className="createNew__createAccountForm__inputs__form" id="createNew__createAccountForm__inputs__form" onSubmit={(e) => createAccount(e)}>
            <InputField id="createUsername" title="username" width="280px" />
            <InputField id="createName" title="first name" width="280px" />
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
