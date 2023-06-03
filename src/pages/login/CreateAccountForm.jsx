import { useState, React } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';

/**
 * creates the create accoun form.
 * @returns create account form
 */
const CreateAccountForm = (props) => {
  const [password, setPassword] = useState('null');
  const [confirmPassword, setConfirmPassword] = useState('null');
  const { onSubmit } = props;
  /**
   * changes view between create account and login view.
   */
  const changeView = () => {
    $('#login').css('display', 'flex');
    $('#createNew').css('display', 'none');
    $('#createNew__createAccountForm__inputs__form').trigger('reset');
  };

  // /**
  //  * Informs the user of a succesful login. Also resets the form and moves to login page.
  //  */
  // const succesfulCreation = () => {
  //   $('#createNew__createAccountForm__inputs__form').trigger('reset');
  //   console.log('succesful creation');
  //   changeView();
  // };

  /**
   * sets the error message on or off depending on the on boolean.
   * @param {string} id
   * @param {boolean} on
   */
  const errorMessage = (id, on) => {
    if (on) {
      $(`#${id}__container__error`).css('display', 'flex');
      $(`#${id}__container__label`).css('display', 'none');
      $(`#${id}__container__cutout`).css('display', 'none');
      $(`#${id}__container__input`).css('border', '1.5px solid $red');
    } else {
      $(`#${id}__container__error`).css('display', 'none');
      $(`#${id}__container__label`).css('display', 'flex');
      $(`#${id}__container__cutout`).css('display', 'flex');
      $(`#${id}__container__input`).css('border', '1.5px solid $orange');
    }
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
      if (regex.test(string)) errorMessage('createEmail', false);
      else errorMessage('createEmail', true);
    });

    /**
     * Checks the passwords match
     */
    $('#createPassword').on('change', (val) => {
      const input = val.target.value;
      setPassword(input);
      if (input !== confirmPassword) errorMessage('createConfirmPassword', true);
      else {
        errorMessage('createConfirmPassword', false);
      }
    });

    /**
     * Checks the passwords match.
     */
    $('#createConfirmPassword').on('change', (val) => {
      const input = val.target.value;
      setConfirmPassword(input);
      if (input !== password) errorMessage('createConfirmPassword', true);
      else {
        errorMessage('createConfirmPassword', false);
      }
    });
  });

  return (
    <div className="createNew" id="createNew">
      <div className="createNew__createAccountForm">
        <div className="createNew__createAccountForm__header" id="createNew__createAccountForm__header"> Create account </div>
        <div className="createNew__createAccountForm__inputs">
          <form className="createNew__createAccountForm__inputs__form" id="createNew__createAccountForm__inputs__form" onSubmit={(e) => onSubmit(e)}>
            <InputField id="createUsername" title="username" width="280px" />
            <InputField id="createName" title="first name" width="280px" />
            <InputField id="createEmail" title="email" width="280px" error="doesn't match example@email.com" />
            <InputField id="createPassword" type="password" title="password" width="280px" error="passwords don't match" />
            <InputField id="createConfirmPassword" type="password" title="confirm password" width="280px" error="passwords don't match" />
          </form>
          <button className="createNew__createAccountForm__inputs__submit" id="createNew__createAccountForm__inputs__submit" type="submit" form="createNew__createAccountForm__inputs__form"> submit </button>
        </div>
      </div>
      <div className="createNew__login">
        Already have an account?&nbsp;
        <button className="createNew__login__button" id="createNew__login__button" type="button" tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Login </button>
      </div>
    </div>
  );
};

CreateAccountForm.propTypes = {
  onSubmit: propTypes.func,
};

CreateAccountForm.defaultProps = {
  onSubmit: null,
};

export default CreateAccountForm;
