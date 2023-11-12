import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import SettingsInputField from '../../components/SettingsInputField';

/**
 * Renders the account info settings page.
 * @property {String} className - Custom className if wanted. Default userInfo.
 * @property {String} id - Custom id if wanted. Default userInfo.
 * @property {String} currName - the current name of the account.
 * @property {String} currName - the current role of the account.
 * @property {String} currUsername - the current username of the account.
 * @property {String} currEmail - the current email of the account
 * @property {func} updateAccount - the function to update account.
 * @property {func} openForm - the function to open the form.
 * @property {func} setName - the function to set the name on change.
 * @property {func} setUsername - the function to set the username on change.
 * @property {func} setEmail - the function to set the email on change.
 * @property {func} setNewPassword - the function to set the password on change.
 * @returns user info page.
 */
const UserInfo = ({
  currUsername,
  openForm,
  currName,
  currEmail,
  setName,
  setUsername,
  setNewPassword,
  updateAccount,
  className,
  id,
  setEmail,
  view,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * UseEffect to check that the password and confirm password match and opens the
   * change button if they do.
   */
  useEffect(() => {
    if (password === confirmPassword) setNewPassword(password);
  }, [password, confirmPassword]);

  return (
    <div className={className} id={id} style={view ? { display: 'flex' } : { display: 'none' }}>
      <div className={`${className}__values`}>
        <button className={`${className}__values__closeButton`} id={`${id}__header__closeButton`} type="submit" onClick={() => openForm('none')}>  </button>
        <SettingsInputField title="name" onChange={setName} onSubmit={(e) => updateAccount(e)} defaultValue={currName} id="settingsName" />
        <SettingsInputField title="username" onChange={setUsername} onSubmit={(e) => updateAccount(e)} defaultValue={currUsername} id="settingsUsername" />
        <SettingsInputField title="email" onChange={setEmail} onSubmit={(e) => updateAccount(e)} defaultValue={currEmail} id="settingsEmail" />
        <form className={`${className}__values__password`} id={`${id}__values__password`} onSubmit={(e) => updateAccount(e)}>
          <div className={`${className}__values__password__passContainer`}>
            <div className={`${className}__values__password__passContainer__passText`}>
              password &nbsp;
            </div>
            <div className={`${className}__values__password__passContainer__input`}>
              <input className={`${className}__values__password__passContainer__input__field`} placeholder="******" type="password" onChange={(current) => setPassword(current.target.value)} />
            </div>
          </div>
          <div
            className={`${className}__values__password__confirmContainer`}
            id={`${id}__values__password__confirmContainer`}
            style={password !== '' ? { display: 'grid' } : { display: 'none' }}
          >
            <div className={`${className}__values__password__confirmContainer__confirmText`}>
              confirm &nbsp;
            </div>
            <div className={`${className}__values__password__confirmContainer__input`}>
              <input className={`${className}__values__password__confirmContainer__input__field`} id="settingsConfirm__form__input" type="password" onChange={(current) => setConfirmPassword(current.target.value)} />
              <button
                className={`${className}__values__password__confirmContainer__input__change`}
                id={`${id}__values__password__confirmContainer__input__change`}
                type="submit"
                style={password === confirmPassword ? { display: 'flex' } : { display: 'none' }}
              >
                change
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  currUsername: propTypes.string,
  openForm: propTypes.func,
  currName: propTypes.string,
  setName: propTypes.func,
  setUsername: propTypes.func,
  setNewPassword: propTypes.func,
  setEmail: propTypes.func,
  currEmail: propTypes.string,
  updateAccount: propTypes.func,
  view: propTypes.bool,
};

UserInfo.defaultProps = {
  className: 'userInfo',
  id: 'userInfo',
  currUsername: null,
  openForm: null,
  currName: null,
  setName: null,
  setUsername: null,
  setNewPassword: null,
  setEmail: null,
  currEmail: null,
  updateAccount: null,
  view: true,
};

export default UserInfo;
