import $ from 'jquery';
import { useState, React } from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';

/**
 * creates the sign in form.
 * @returns login and sign in view.
 */
const LoginForm = (props) => {
  const [contactVisible, setcontactVisible] = useState(false);
  const { onSubmit } = props;
  /**
   * changes view between login form and create account form.
   *
   */
  const changeView = () => {
    $('#login').css('display', 'none');
    $('#createNew').css('display', 'flex');
    $('#loginForm__inputs__form').trigger('reset');
  };

  /**
   * sents a reset password message.
   */
  const getPassword = (e) => {
    e.preventDefault();
    // console.log('sent');
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
        <div className="login__loginForm__header" id="login__loginForm__header"> Login </div>
        <div className="login__loginForm__inputs">
          <form className="login__loginForm__inputs__form" id="loginForm__inputs__form" onSubmit={(e) => onSubmit(e)}>
            <InputField id="loginUsername" title="username" width="280px" />
            <InputField id="loginPassword" type="password" title="password" width="280px" />
          </form>
          <div className="login__loginForm__inputs__passwordInfo">
            <button type="button" className="login__loginForm__inputs__passwordInfo__forgotPassword" id="login__loginForm__inputs__passwordInfo__forgotPassword" onClick={() => switchContact()}> Forgot password? </button>
            <div className="login__loginForm__inputs__passwordInfo__contact" id="login__loginForm__inputs__passwordInfo__contact">
              <form className="login__loginForm__inputs__passwordInfo__contact__email" id="login__loginForm__inputs__passwordInfo__contact__email" onSubmit={(e) => getPassword(e)}>
                <InputField title="enter your email" width="220px" />
                <button type="submit" className="login__loginForm__inputs__passwordInfo__contact__email__resetBtn" id="login__loginForm__inputs__passwordInfo__contact__email__resetBtn"> get new password </button>
              </form>
            </div>
          </div>
          <button type="submit" className="login__loginForm__inputs__loginBtn" id="login__loginForm__inputs__loginBtn" name="loginBtn" form="loginForm__inputs__form"> login </button>
        </div>
      </div>
      <div className="login__createAccount">
        Don&apos;t have an account?&nbsp;
        <button type="button" className="login__createAccount__button" id="login__createAccount__button" tabIndex={0} onClick={() => changeView()} onKeyDown={() => changeView()}> Create new </button>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: propTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: null,
};

export default LoginForm;
