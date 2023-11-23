import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';
import LoadingBar from '../../components/LoadingBar';

/**
 * creates the create accoun form.
 * @property {String} ClassName - custom className if wanted. Default is createNew.
 * @property {String} id - custom id if wanted. Default is createNew.
 * @property {func} onSubmit - The onSubmit function to be used in the form.
 * @property {String} error - The error meessage for login if there is.
 * @property {Integer} loading - The state of loading
 * @property {Boolean} view - if view is visible or not.
 * @property {Integer} setView - function to set the view
 * @returns create account form
 */
const CreateAccountForm = ({
  className, id, onSubmit, error, loading, view, setView,
}) => {
  const [password, setPassword] = useState('none');
  const [confirmPassword, setConfirmPassword] = useState('null');
  const [difference, setDifference] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  // regex to match password.
  const passRegexp = /^(?=.*\w)(?=.*\d)(?=.*[@$!%*#?&])[\w@$!%*#?&]{8,}/;
  // regex to match username
  const userNameRehexp = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  /**
   * UseEffect to detect changes in passWord and confirmPassword
   * and check that it matches the required format.
   */
  useEffect(() => {
    if (passRegexp.test(password) && password !== 'none') setCorrect(true);
    else setCorrect(false);

    if (password !== confirmPassword && password !== 'none') {
      setDifference(true);
      setDisplayError(true);
    } else {
      setDifference(false);
      setDisplayError(false);
    }
  }, [password, confirmPassword]);

  return (
    <div className={className} id={id} style={view ? { display: 'flex' } : { display: 'none' }}>
      <div className={`${className}__createAccountForm`}>
        <div className={`${className}__createAccountForm__header`} id={`${id}__createAccountForm__header`}> Create account </div>
        <div className={`${className}__createAccountForm__error`} id={`${id}__createAccountForm__error`}>
          {error}
        </div>
        <div className={`${className}__createAccountForm__inputs`}>
          <form className={`${className}__createAccountForm__inputs__form`} id={`${id}__createAccountForm__inputs__form`} onSubmit={(e) => onSubmit(e)}>
            <InputField id="createUsername" title="username" width="240px" height="40px" regex={userNameRehexp} error="no special characters or spaces" />
            <InputField id="createName" title="first name" width="240px" height="40px" />
            <InputField id="createEmail" title="email" width="240px" height="40px" />
            <div className={`${className}__createAccountForm__inputs__form__password`}>
              <InputField id="createPassword" type="password" title="password" width="240px" height="40px" regex={passRegexp} error="doesn't include all required characters" onChange={setPassword} />
              <div
                className={`${className}__createAccountForm__inputs__form__password__message`}
                id={`${id}__createAccountForm__inputs__form__password__message`}
                style={!correct ? { display: 'block' } : { display: 'none' }}
              >
                Password must be minimum of 8 characters with:
                <br />
                - uppercase letter
                <br />
                - number
                <br />
                - special character
              </div>
            </div>
            <InputField id="createConfirmPassword" type="password" title="confirm password" width="240px" height="40px" error="passwords don't match" onChange={setConfirmPassword} displayError={displayError} />
            <label className={`${className}__createAccountForm__inputs__form__roleLabel`} htmlFor="createRole">
              <span className={`${className}__createAccountForm__inputs__form__roleLabel__text`}>
                role:
              </span>
              <select className={`${className}__createAccountForm__inputs__form__roleLabel__selection`} id={`${id}__createAccountForm__inputs__form__roleLabel__selection`} name="createRole">
                <option value="1"> Seller </option>
              </select>
            </label>
          </form>
          {loading === 2 ? (
            <div className={`${className}__createAccountForm__inputs__load`}>
              <div className={`${className}__createAccountForm__inputs__load__container`}>
                <LoadingBar />
              </div>
            </div>
          ) : (
            <button
              className={`${className}__createAccountForm__inputs__submit`}
              id={`${id}__createAccountForm__inputs__submit`}
              type="submit"
              form={`${id}__createAccountForm__inputs__form`}
              disabled={!(correct && !difference)}
            >
              submit
            </button>
          )}
        </div>
      </div>
      <div className={`${className}__login`}>
        Already have an account?&nbsp;
        <button className={`${className}__login__button`} id={`${id}__login__button`} type="button" tabIndex={0} onClick={() => setView('create')}> Login. </button>
      </div>
    </div>
  );
};

CreateAccountForm.propTypes = {
  onSubmit: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
  error: propTypes.string,
  loading: propTypes.number,
  view: propTypes.number,
  setView: propTypes.func,
};

CreateAccountForm.defaultProps = {
  onSubmit: null,
  className: 'createNew',
  id: 'createNew',
  error: null,
  loading: 0,
  view: true,
  setView: null,
};

export default CreateAccountForm;
