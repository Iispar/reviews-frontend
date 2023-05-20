import $ from 'jquery';
import { useState, React } from 'react';
import InputField from '../../components/InputField';

/**
 * creates the sign in form.
 * @returns login and sign in view.
 */
const LoginForm = () => {
  const [contactVisible, setcontactVisible] = useState(true);
  /**
   * changes view between login form and create account form.
   *
   */
  const changeView = () => {
    $('#login').css('display', 'none');
    $('#createNew').css('display', 'flex');
  };

  /**
   * sents a reset password message.
   */
  const getPassword = () => {
    console.log('sent');
  };

  /**
   * Switches between visible and closed with the contact form
   */
  const switchContact = () => {
    if (contactVisible) {
      $('#login__loginForm__inputs__passwordInfo__contact').css('display', 'none');
      setcontactVisible(false);
    } else {
      $('#login__loginForm__inputs__passwordInfo__contact').css('display', 'flex');
      setcontactVisible(true);
    }
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
          <div className="login__loginForm__inputs__passwordInfo">
            <button type="button" className="login__loginForm__inputs__passwordInfo__forgotPassword" onClick={() => switchContact()}> Forgot password? </button>
            <div className="login__loginForm__inputs__passwordInfo__contact" id="login__loginForm__inputs__passwordInfo__contact">
              <form className="login__loginForm__inputs__passwordInfo__contact__email" id="login__loginForm__inputs__passwordInfo__contact__email" onSubmit={() => getPassword()}>
                <InputField title="enter your email" width="220px" />
                <button type="submit" className="login__loginForm__inputs__passwordInfo__contact__email__resetBtn"> get new password </button>
              </form>
            </div>
          </div>
          <button type="submit" className="login__loginForm__inputs__loginBtn" form="loginForm__inputs__form"> login </button>
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
