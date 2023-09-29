/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */

import authService from '../../services/authService';

/**
 * The login hook to be called when trying to login.
 * sets accountId and token to localStorage
 * @param {String} username
 *        The username that tried to login.
 * @param {String} password
 *        The password that tried to login.
 * @returns token if successful, null otherwise.
 */
export const UseLogin = async (username, password) => {
  const payload = {
    username,
    password,
  };
  const res = await authService.login(payload);
  window.localStorage.setItem('token', JSON.stringify(res.token).replace(/^"(.*)"$/, '$1'));
  window.localStorage.setItem('accountId', JSON.stringify(res.accountId).replace(/^"(.*)"$/, '$1'));
  return res.token;
};

/**
 * The create hook to be called when trying to create a new account.
 * @param {String} username
 *        Username that tries to create account.
 * @param {String} name
 *        name that tries to create account.
 * @param {String} email
 *        email that tries to create account.
 * @param {String} password
 *        password that tries to create account.
 * @param {String} password
 *        role that tries to create account.
 * @returns true if successful, false otherwise.
 */
export const UseCreateAccount = async (username, name, email, password, role) => {
  const payload = {
    username,
    name,
    email,
    password,
    role: { id: role },
  };
  const res = await authService.createAccount(payload);
  window.localStorage.setItem('token', JSON.stringify(res.token).replace(/^"(.*)"$/, '$1'));
  window.localStorage.setItem('accountId', JSON.stringify(res.accountId).replace(/^"(.*)"$/, '$1'));
  return res.token;
};
