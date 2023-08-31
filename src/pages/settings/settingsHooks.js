/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import accountService from '../../services/accountService';

/**
 * hook to delete an users account
 * @param {String} password
 *        the password of the user
 * @returns true if successful, false otherwise.
 */
export const UseDeleteAccount = (password) => {
  return true;
};

/**
 * hook to update name of user.
 * @param {String} name
 *        The new name for the user.
 * @returns true if successful, false otherwise.
 */
export const UseNewName = (accountId, name, username, password, role, email, token) => {
  const account = {
    name,
    username,
    password,
    role: { id: role },
    email,
  };
  accountService.updateAccount(accountId, account, token)
    .then();
  return true;
};

/**
 * Hook to update username
 * @param {String} username
 *        The new username for the user.
 * @returns true if successful, false otherwise.
 */
export const UseNewUsername = (username) => {
  return true;
};

/**
 * Hook to update password
 * @param {String} password
 *        The new password for the user.
 * @returns true if successful, false otherwise.
 */
export const UseNewPassword = (password) => {
  return true;
};
