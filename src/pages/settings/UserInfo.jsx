import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import SettingsInputField from '../../components/SettingsInputField';

/**
 * Renders the account info settings page.
 * @property {String} className - Custom className if wanted. Default userInfo.
 * @property {String} id - Custom id if wanted. Default userInfo.
 * @property {String} currName - the current name of the account.
 *  * @property {String} currName - the current role of the account.
 * @property {String} currUsername - the current username of the account.
 * @property {String} currEmail - the current email of the account
 * @property {func} updateAccount - the function to update account.
 * @property {func} openForm - the function to open the form.
 * @property {func} setName - the function to set the name on change.
 * @property {func} setUsername - the function to set the username on change.
 * @property {func} setEmail - the function to set the email on change.
 * @property {func} setNewPassword - the function to set the password on change.
 * @property {func} setRole - the function to set the role on change.
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
  setRole,
  updateAccount,
  className,
  id,
  setEmail,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * UseEffect to check that the password and confirm password match and opens the
   * change button if they do.
   */
  useEffect(() => {
    if (password !== '') $(`#${id}__values__password__confirmContainer`).css('display', 'grid');
    else $(`#${id}__values__password__confirmContainer`).css('display', 'none');
    if (password === confirmPassword) {
      setNewPassword(password);
      $(`#${id}__values__password__confirmContainer__input__change`).css('display', 'flex');
    } else $(`#${id}__values__password__confirmContainer__input__change`).css('display', 'none');
  }, [password, confirmPassword]);

  return (
    <div className={className} id={id}>
      <div className={`${className}__header`}>
        <div className={`${className}__header__icon`} />
        <div className={`${className}__header__title`}>
          <span className={`${className}__header__title__username`} id={`${className}__header__title__username`}>
            {currUsername}
          </span>
          <button className={`${className}__header__title__change`} id={`${className}__header__title__change`} type="button"> Change profile picture </button>
        </div>
        <button className={`${className}__header__closeButton`} id={`${className}__header__closeButton`} type="submit" onClick={() => openForm('none')}>  </button>
      </div>
      <div className={`${className}__values`}>
        <SettingsInputField title="name" onChange={setName} onSubmit={(e) => updateAccount(e)} defaultValue={currName} id="settingsName" />
        <SettingsInputField title="username" onChange={setUsername} onSubmit={(e) => updateAccount(e)} defaultValue={currUsername} id="settingsUsername" />
        <SettingsInputField title="email" onChange={setEmail} onSubmit={(e) => updateAccount(e)} defaultValue={currEmail} id="settingsEmail" />
        <label className={`${className}__values__role`} htmlFor="updateRole">
          role:
          <select id="updateRole" name="updateRole" onChange={(e) => setRole(e.target.value)}>
            <option value="1"> Seller </option>
            <option value="2"> Customer </option>
          </select>
        </label>
        <form className={`${className}__values__password`} id={`${className}__values__password`} onSubmit={(e) => updateAccount(e)}>
          <div className={`${className}__values__password__passContainer`}>
            <div className={`${className}__values__password__passContainer__passText`}>
              password &nbsp;
            </div>
            <div className={`${className}__values__password__passContainer__input`}>
              <input className={`${className}__values__password__passContainer__input__field`} placeholder="******" type="password" onChange={(current) => setPassword(current.target.value)} />
            </div>
          </div>
          <div className={`${className}__values__password__confirmContainer`} id={`${className}__values__password__confirmContainer`}>
            <div className={`${className}__values__password__confirmContainer__confirmText`}>
              confirm &nbsp;
            </div>
            <div className={`${className}__values__password__confirmContainer__input`}>
              <input className={`${className}__values__password__confirmContainer__input__field`} type="password" onChange={(current) => setConfirmPassword(current.target.value)} />
              <button className={`${className}__values__password__confirmContainer__input__change`} id={`${className}__values__password__confirmContainer__input__change`} type="submit"> change </button>
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
  setRole: propTypes.func,
  setName: propTypes.func,
  setUsername: propTypes.func,
  setNewPassword: propTypes.func,
  setEmail: propTypes.func,
  currEmail: propTypes.string,
  updateAccount: propTypes.func,
};

UserInfo.defaultProps = {
  className: 'userInfo',
  id: 'userInfo',
  currUsername: null,
  setRole: null,
  openForm: null,
  currName: null,
  setName: null,
  setUsername: null,
  setNewPassword: null,
  setEmail: null,
  currEmail: null,
  updateAccount: null,
};

export default UserInfo;
