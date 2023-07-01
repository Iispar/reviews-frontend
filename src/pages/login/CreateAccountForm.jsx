import { useState, React, useEffect } from 'react';
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

  /**
   * Displays the error message to a component.
   * @param {String} id
   *        id of the component to display error message to
   * @param {boolean} on
   *        if the error message should be on or off.
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

  useEffect(() => {
    if (password !== confirmPassword) errorMessage('createConfirmPassword', true);
    else {
      errorMessage('createConfirmPassword', false);
    }
  }, [password, confirmPassword]);

  /**
   * Loads listeners to input fields when the app loads fully.
   * CAN THIS BE DONE IN INPUTFIELD!!!!!!! TODO:
   */
  $(document).ready(() => {
    /**
     * Checks the passwords match
     */
    $('#createPassword').on('input', async (val) => {
      const input = val.target.value;
      await setPassword(input);
      if (input !== confirmPassword) errorMessage('createConfirmPassword', true);
      else {
        errorMessage('createConfirmPassword', false);
      }
    });

    /**
     * Checks the passwords match.
     */
    $('#createConfirmPassword').on('input', async (val) => {
      const input = val.target.value;
      await setConfirmPassword(input);
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
            <InputField id="createUsername" title="username" width="240px" height="40px" />
            <InputField id="createName" title="first name" width="240px" height="40px" />
            <InputField id="createEmail" title="email" width="240px" height="40px" error="doesn't match example@email.com" regex={/^\w*@\w*\..\w*/} />
            <InputField id="createPassword" type="password" title="password" width="240px" height="40px" error="passwords don't match" />
            <InputField id="createConfirmPassword" type="password" title="confirm password" width="240px" height="40px" error="passwords don't match" />
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
