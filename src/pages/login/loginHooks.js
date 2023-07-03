/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */

/**
 * The login hook to be called when trying to login.
 * @param {String} username
 *        The username that tried to login.
 * @param {String} password
 *        The password that tried to login.
 * @returns true if successful, false otherwise.
 */
export const UseLogin = (username, password) => {
  // console.log(`Login with username: ${username}, password: ${password}`);

  return true;
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
 * @returns true if successful, false otherwise.
 */
export const UseCreateAccount = (username, name, email, password) => {
  // console.log(`New account with username: ${username}, name: ${name}, email: ${email}, password: ${password}`);

  return true;
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
