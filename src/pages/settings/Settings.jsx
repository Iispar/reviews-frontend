/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Selections from './Selections';
import accountService from '../../services/accountService';

/**
 * Renders the settings page.
 * @property {String} className - Custom className if wanted. Default settings.
 * @property {String} id - Custom id if wanted. Default settings.
 * @returns settings
 */
const Settings = ({ className, id }) => {
  const [accountId, setAccountId] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const curAccountId = window.localStorage.getItem('accountId');
    const curToken = window.localStorage.getItem('token');
    setAccountId(curAccountId);
    setToken(curToken);

    accountService.getAccount(curAccountId, curToken)
      .then((res) => {
        setName(res.name);
        setUsername(res.username);
        setEmail(res.email);
      });
  });
  /**
   * Formats the event call and calls the delete account hook.
   * @param {*} e - event called with.
   */
  const deleteAccount = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // if (UseDeleteAccount(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };

  /**
     * Formats the event call and calls the update name hook.
     * @param {*} e - event called with.
     */
  const updateName = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // if (UseNewName(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };

  /**
     * Formats the event call and calls the update username hook.
     * @param {*} e - event called with.
     */
  const updateUsername = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // if (UseNewUsername(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };

  /**
     * Formats the event call and calls the update password hook.
     * @param {*} e - event called with.
     */
  const updatePassword = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // if (UseNewPassword(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };

  const updateEmail = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // if (UseNewPassword(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };
  return (
    <div className={className}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__title`} id={`${id}__grid__title`}>
          Settings
        </div>
        <div className={`${className}__grid__selections`} id={`${id}__grid__selections`}>
          <Selections
            updatePassword={(e) => updatePassword(e)}
            updateUsername={(e) => updateUsername(e)}
            updateName={(e) => updateName(e)}
            deleteAccount={(e) => deleteAccount(e)}
            updateEmail={(e) => updateEmail(e)}
            username={username}
            name={name}
            email={email}
            key={email}
          />
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Settings.defaultProps = {
  className: 'settings',
  id: 'settings',
};

export default Settings;
