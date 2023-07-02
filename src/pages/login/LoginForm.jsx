import $ from 'jquery';
import { useState, React } from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';

/**
 * creates the login form.
 * @property {String} className - Custom className if wanted. Default loginForm.
 * @property {String} id - Custom id if wanted. Default loginForm.
 * @property {func} onSubmit - The onSubmit function to be used with the form.
 * @property {func} newPass - function for the new password form submit.
 * @returns loginin view.
 */
const LoginForm = (props) => {
  const [contactVisible, setcontactVisible] = useState(false);
  const { onSubmit } = props;
  const { newPass } = props;
  const { className } = props;
  const { id } = props;
  /**
   * changes view between login form and create account form.
   */
  const changeView = () => {
    $(`#${id}`).css('display', 'none');
    $(`#${id}`).css('display', 'flex');
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
        <div className={`${className}__loginForm__inputs`}>
          <form className={`${className}__loginForm__inputs__form`} id={`${id}Form__inputs__form`} onSubmit={(e) => onSubmit(e)}>
            <InputField id="loginUsername" title="username" width="240px" height="40px" />
            <InputField id="loginPassword" type="password" title="password" width="240px" height="40px" />
          </form>
          <div className={`${className}__loginForm__inputs__passwordInfo`}>
            <button type="button" className={`${className}__loginForm__inputs__passwordInfo__forgotPassword`} id={`${id}__loginForm__inputs__passwordInfo__forgotPassword`} onClick={() => switchContact()}> Forgot password? </button>
            <div className={`${className}__loginForm__inputs__passwordInfo__contact`} id={`${id}__loginForm__inputs__passwordInfo__contact`}>
              <form className={`${className}__loginForm__inputs__passwordInfo__contact__email`} id={`${id}__loginForm__inputs__passwordInfo__contact__email`} onSubmit={(e) => newPass(e)}>
                <InputField title="enter your email" width="220px" height="40px" />
                <button type="submit" className={`${className}__loginForm__inputs__passwordInfo__contact__email__resetBtn`} id={`${className}__loginForm__inputs__passwordInfo__contact__email__resetBtn`}> get new password </button>
              </form>
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
  newPass: propTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: null,
  className: 'login',
  id: 'login',
  newPass: null,
};

export default LoginForm;
