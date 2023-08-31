import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import SettingsInputField from '../../components/SettingsInputField';

/**
 * Renders the user info settings page.
 * @property {String} className - Custom className if wanted. Default userInfo.
 * @property {String} id - Custom id if wanted. Default userInfo.
 * @property {String} currName - the current name of the user.
 * @property {String} currUsername - the current username of the user.
 * @property {func} updateName - the function to update name.
 * @property {func} updateUsername - the function to update username.
 * @property {func} updatePassword - the function to update password.
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
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
