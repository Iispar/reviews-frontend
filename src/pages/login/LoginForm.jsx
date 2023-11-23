import React, { useState } from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';
import LoadingBar from '../../components/LoadingBar';

/**
 * creates the login form.
 * @property {String} className - Custom className if wanted. Default loginForm.
 * @property {String} id - Custom id if wanted. Default loginForm.
 * @property {func} onSubmit - The onSubmit function to be used with the form.
 * @property {String} errorMessage - The error meessage for login if there is.
 * @property {Integer} loading - The state of loading.
 * @property {Boolean} view - if view is visible or not.
 * @property {Integer} setView - function to set the view
 * @returns loginin view.
 */
const LoginForm = ({
  onSubmit, className, id, errorMessage, loading, view, setView,
}) => {
  const [contact, setContact] = useState(false);
  return (
    <div className={className} id={id} style={view ? { display: 'flex' } : { display: 'none' }}>
      <div className={`${className}__loginForm`}>
        <div className={`${className}__loginForm__header`} id={`${id}__loginForm__header`}> Login </div>
        <div className={`${className}__loginForm__error`} id={`${id}__loginForm__error`}>
          {errorMessage}
        </div>
        <div className={`${className}__loginForm__inputs`}>
          <form className={`${className}__loginForm__inputs__form`} id={`${id}Form__inputs__form`} onSubmit={(e) => onSubmit(e)}>
            <InputField id="loginUsername" title="username" width="240px" height="40px" />
            <InputField id="loginPassword" type="password" title="password" width="240px" height="40px" />
          </form>
          <div className={`${className}__loginForm__inputs__passwordInfo`}>
            <button type="button" className={`${className}__loginForm__inputs__passwordInfo__forgotPassword`} id={`${id}__loginForm__inputs__passwordInfo__forgotPassword`} onClick={contact ? () => setContact(false) : () => setContact(true)}> Forgot password? </button>
            <div className={`${className}__loginForm__inputs__passwordInfo__contact`} id={`${id}__loginForm__inputs__passwordInfo__contact`} style={contact ? { display: 'flex' } : { display: 'none' }}>
              Not availabe automatically yet...
              Just contact me at my email if you want to reset your password.
              Or just create a new account.
            </div>
          </div>
          {loading === 2 ? (
            <div className={`${className}__loginForm__inputs__load`}>
              <div className={`${className}__loginForm__inputs__load__container`}>
                <LoadingBar />
              </div>
            </div>
          ) : (
            <button type="submit" className={`${className}__loginForm__inputs__loginBtn`} id={`${id}__loginForm__inputs__loginBtn`} name={`${className}Btn`} form={`${id}Form__inputs__form`}> login </button>
          )}
        </div>
      </div>
      <div className={`${className}__createAccount`}>
        Don&#39;t have an account?&nbsp;
        <button type="button" className={`${className}__createAccount__button`} id={`${id}__createAccount__button`} tabIndex={0} onClick={() => setView('login')}> Create new </button>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
  errorMessage: propTypes.string,
  loading: propTypes.number,
  view: propTypes.number,
  setView: propTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: null,
  className: 'login',
  id: 'login',
  errorMessage: null,
  loading: 0,
  view: true,
  setView: null,
};

export default LoginForm;
