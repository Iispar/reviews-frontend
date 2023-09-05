import { useState, React, useEffect } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';

/**
 * creates the create accoun form.
 * @property {String} ClassName - custom className if wanted. Default is createNew.
 * @property {String} id - custom id if wanted. Default is createNew.
 * @property {func} onSubmit - The onSubmit function to be used in the form.
 * @returns create account form
 */
const CreateAccountForm = ({ className, id, onSubmit }) => {
  const [password, setPassword] = useState('null');
  const [confirmPassword, setConfirmPassword] = useState('null');
  // regex to match password.
  const passRegexp = /^(?=.*\w)(?=.*\d)(?=.*[@$!%*#?&])[\w@$!%*#?&]{8,}/;
  // regex to match username
  const userNameRehexp = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  /**
   * changes view between create account and login view.
   */
  const changeView = () => {
    $('#login').css('display', 'flex');
    $(`#${id}`).css('display', 'none');
    $(`#${id}__createAccountForm__inputs__form`).trigger('reset');
  };

  /**
   * Displays the error message to a component.
   * @param {String} selection
   *        id of the component to display error message to
   * @param {boolean} on
   *        if the error message should be on or off.
   */
  const errorMessage = (selection, on) => {
    if (on) {
      $(`#${selection}__container__error`).css('display', 'flex');
      $(`#${selection}__container__label`).css('display', 'none');
      $(`#${selection}__container__cutout`).css('display', 'none');
      $(`#${selection}__container__input`).css('border', '1.5px solid $red');
    } else {
      $(`#${selection}__container__error`).css('display', 'none');
      $(`#${selection}__container__label`).css('display', 'flex');
      $(`#${selection}__container__cutout`).css('display', 'flex');
      $(`#${selection}__container__input`).css('border', '1.5px solid $orange');
    }
  };

  /**
   * UseEffect to detect changes in passWord and confirmPassword
   * and check that it matches the required format.
   */
  useEffect(() => {
    if (!passRegexp.test(password)) {
      $(`#${className}__createAccountForm__inputs__form__password__message`).css('display', 'block');
      $(`#${className}__createAccountForm__inputs__submit`).prop('disabled', true);
    } else if (password !== confirmPassword) {
      $(`#${className}__createAccountForm__inputs__form__password__message`).css('display', 'none');
      $(`#${className}__createAccountForm__inputs__submit`).prop('disabled', true);
      errorMessage('createConfirmPassword', true);
    } else {
      $(`#${className}__createAccountForm__inputs__form__password__message`).css('display', 'none');
      $(`#${className}__createAccountForm__inputs__submit`).prop('disabled', false);
      errorMessage('createConfirmPassword', false);
    }
  }, [password, confirmPassword]);

  return (
    <div className={className} id={id}>
      <div className={`${className}__createAccountForm`}>
        <div className={`${className}__createAccountForm__header`} id={`${className}__createAccountForm__header`}> Create account </div>
        <div className={`${className}__createAccountForm__inputs`}>
          <form className={`${className}__createAccountForm__inputs__form`} id={`${className}__createAccountForm__inputs__form`} onSubmit={(e) => onSubmit(e)}>
            <InputField id="createUsername" title="username" width="240px" height="40px" regex={userNameRehexp} error="no special characters or spaces" />
            <InputField id="createName" title="first name" width="240px" height="40px" />
            <InputField id="createEmail" title="email" width="240px" height="40px" />
            <div className={`${className}__createAccountForm__inputs__form__password`}>
              <InputField className={className} id="createPassword" type="password" title="password" width="240px" height="40px" regex={passRegexp} error="doesn't include all required characters" onChange={setPassword} />
              <div className={`${className}__createAccountForm__inputs__form__password__message`} id={`${className}__createAccountForm__inputs__form__password__message`}>
                Password must be minimum of 8 characters with:
                <br />
                - uppercase letter
                <br />
                - number
                <br />
                - special character
              </div>
            </div>
            <InputField id="createConfirmPassword" type="password" title="confirm password" width="240px" height="40px" error="passwords don't match" onChange={setConfirmPassword} />
            <label className={`${className}__createAccountForm__inputs__form__roleLabel`} htmlFor="createRole">
              role:
              <select className={`${className}__createAccountForm__inputs__form__roleLabel__selection`} id={`${id}__createAccountForm__inputs__form__roleLabel__selection`} name="createRole">
                <option value="1"> Seller </option>
              </select>
            </label>
          </form>
          <button className={`${className}__createAccountForm__inputs__submit`} id={`${className}__createAccountForm__inputs__submit`} type="submit" form={`${className}__createAccountForm__inputs__form`}> submit </button>
        </div>
      </div>
      <div className={`${className}__login`}>
        Already have an account?&nbsp;
        <button className={`${className}__login__button`} id={`${className}__login__button`} type="button" tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Login </button>
      </div>
    </div>
  );
};

CreateAccountForm.propTypes = {
  onSubmit: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
};

CreateAccountForm.defaultProps = {
  onSubmit: null,
  className: 'createNew',
  id: 'createNew',
};

export default CreateAccountForm;
