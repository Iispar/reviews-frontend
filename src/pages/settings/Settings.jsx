/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Selections from './Selections';
import accountService from '../../services/accountService';
import { UseNewName } from './settingsHooks';

/**
 * Renders the settings page.
 *
 * !!
 * i use two sets of usestates. cur and new. Id i use only one and set the cur value as
 * set state in the selection it will update the current value also and it will display
 * the changes on screen right away and also all comparisitions to the init value will change
 * as the init value will update with the set. This feels a bit stupid and overkill so (TODO: )
 * Find a better way to do this.
 * (TODO:)
 * !!
 * @property {String} className - Custom className if wanted. Default settings.
 * @property {String} id - Custom id if wanted. Default settings.
 * @returns settings
 */
const Settings = ({ className, id }) => {
  const [accountId, setAccountId] = useState(null);
  const [token, setToken] = useState(null);
  const [curName, setCurName] = useState(null);
  const [curUsername, setCurUsername] = useState(null);
  const [curEmail, setCurEmail] = useState(null);
  const [curPassword, setCurPassword] = useState('none');
  const [curRole, setCurRole] = useState(null);

  const [newName, setNewName] = useState(null);
  const [newUsername, setNewUsername] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPassword, setNewPassword] = useState('none');
  const [newRole, setNewRole] = useState(null);

  useEffect(() => {
    const curAccountId = window.localStorage.getItem('accountId');
    const curToken = window.localStorage.getItem('token');
    setAccountId(curAccountId);
    setToken(curToken);

    accountService.getAccount(curAccountId, curToken)
      .then((res) => {
        setCurName(res.name);
        setCurUsername(res.username);
        setCurEmail(res.email);
        setCurRole(res.role.id);

        setNewName(res.name);
        setNewUsername(res.username);
        setNewEmail(res.email);
        setNewRole(res.role.id);
      });
  }, []);
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
  const updateAccount = (e) => {
    e.preventDefault();
    console.log(newName);
    console.log(newUsername);
    console.log(newPassword);
    console.log(newEmail);
    console.log(newRole);
    // UseNewName(accountId, name, username, password, role, email, token);
  };

  return (
    <div className={className}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__title`} id={`${id}__grid__title`}>
          Settings
        </div>
        <div className={`${className}__grid__selections`} id={`${id}__grid__selections`}>
          <Selections
            setPassword={setNewPassword}
            setUsername={setNewUsername}
            setName={setNewName}
            deleteAccount={(e) => deleteAccount(e)}
            setEmail={setNewEmail}
            updateAccount={(e) => updateAccount(e)}
            username={curUsername}
            name={curName}
            email={curEmail}
            key={curEmail}
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
