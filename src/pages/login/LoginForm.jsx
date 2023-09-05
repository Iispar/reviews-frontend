import $ from 'jquery';
import { useState, React } from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';

/**
 * creates the login form.
 * @property {String} className - Custom className if wanted. Default loginForm.
 * @property {String} id - Custom id if wanted. Default loginForm.
 * @property {func} onSubmit - The onSubmit function to be used with the form.
 * @property {String} errorMessage - The error meessage for login if there is.
 * @returns loginin view.
 */
const LoginForm = ({
  onSubmit, className, id, errorMessage,
}) => {
  const [contactVisible, setcontactVisible] = useState(false);
  /**
   * changes view between login form and create account form.
   */
  const changeView = () => {
    $(`#${id}`).css('display', 'none');
    $('#createNew').css('display', 'flex');
    // reset the forms so they become empty.
    $(`#${id}__inputs__form`).trigger('reset');
  };

  /**
   * Opens the contact form for a new password.
   */
  const switchContact = () => {
    if (contactVisible) {
      $(`#${id}__loginForm__inputs__passwordInfo__contact`).css('display', 'none');
      setcontactVisible(false);
    } else {
      $(`#${id}__loginForm__inputs__passwordInfo__contact`).css('display', 'flex');
      setcontactVisible(true);
    }
  };

  return (
    <div className={className} id={id}>
      <div className={`${className}__loginForm`}>
        <div className={`${className}__loginForm__header`} id={`${id}__loginForm__header`}> Login </div>
        <div className={`${className}__loginForm__error`}>
          {errorMessage}
        </div>
        <div className={`${className}__loginForm__inputs`}>
          <form className={`${className}__loginForm__inputs__form`} id={`${id}Form__inputs__form`} onSubmit={(e) => onSubmit(e)}>
            <InputField id="loginUsername" title="username" width="240px" height="40px" />
            <InputField id="loginPassword" type="password" title="password" width="240px" height="40px" />
          </form>
          <div className={`${className}__loginForm__inputs__passwordInfo`}>
            <button type="button" className={`${className}__loginForm__inputs__passwordInfo__forgotPassword`} id={`${id}__loginForm__inputs__passwordInfo__forgotPassword`} onClick={() => switchContact()}> Forgot password? </button>
            <div className={`${className}__loginForm__inputs__passwordInfo__contact`} id={`${id}__loginForm__inputs__passwordInfo__contact`}>
              No availabe automatically yet...
              Just contact me at my email if you want to reset your password.
              Or just create a new account.
            </div>
          </div>
          <button type="submit" className={`${className}__loginForm__inputs__loginBtn`} id={`${id}__loginForm__inputs__loginBtn`} name={`${className}Btn`} form={`${className}Form__inputs__form`}> login </button>
        </div>
      </div>
      <div className={`${className}__createAccount`}>
        Don&apos;t have an account?&nbsp;
        <button type="button" className={`${className}__createAccount__button`} id={`${id}__createAccount__button`} tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Create new </button>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
  errorMessage: propTypes.string,
};

LoginForm.defaultProps = {
  onSubmit: null,
  className: 'login',
  id: 'login',
  errorMessage: null,
};

export default LoginForm;
