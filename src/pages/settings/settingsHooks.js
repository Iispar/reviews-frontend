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
export const UseUpdateAccount = (accountId, name, username, password, role, email, token) => {
  const formattedPass = password.length === 0 ? 'none' : password;

  const account = {
    name,
    username,
    password: formattedPass,
    role: { id: role },
    email,
  };
  accountService.updateAccount(accountId, account, token);
};
