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
  try {
    const res = await authService.login(username, password);
    window.localStorage.setItem('token', JSON.stringify(res.token));
    window.localStorage.setItem('accountId', JSON.stringify(res.accountId));
    return res.token;
  } catch (exception) {
    // TODO: ERROR MESSAGE
    console.log('wrong credentials');
  }
  return null;
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
  try {
    const token = await authService.createAccount(username, name, email, password, role);
    window.localStorage.setItem('token', JSON.stringify(token, token));
    return token;
  } catch (exception) {
    // TODO: ERROR MESSAGE
    console.log('error while creating');
  }
  return null;
};

/**
 * the new password hook that gets called when you try to get a new password.
 * @param {String} email
 *        email that wants a new password.
 * @returns true if successful, false otherwise.
 */
export const UseNewPassword = (email) => {
  // console.log(`email request with ${email}`);
  return true;
};
