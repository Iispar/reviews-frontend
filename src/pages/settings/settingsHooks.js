/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import accountService from '../../services/accountService';

/**
 * hook to delete an users account
 * @param {String} id
 *        the id of the account you want to delete
 * @param {Function} setLoading
 *        Sets the state of loading for the view.
 * @returns true if successful, false otherwise.
 */
export const UseDeleteAccount = (id, token, setLoading) => {
  accountService.deleteAccount(id, token)
    .then(() => {
      setLoading(5);
      setTimeout(() => {
        setLoading(0);
      }, 1000);
    })
    .catch(() => {
      setLoading(6);
      setTimeout(() => {
        setLoading(0);
      }, 3000);
    });
};

/**
 * hook to update name of user.
 * @param {String} accountId
 *        The id for the account.
 * @param {String} name
 *        The new name for the account.
 * @param {String} username
 *        The new username for the account
 * @param {String} password
 *        The new password for the account.
 * @param {String} role
 *        The new role for the account.
 * @param {String} email
 *        The new email for the account.
 * @param {String} token
 *        The token of the logged in account.
 * @param {Function} setLoading
 *        Sets the state of loading for the view.
 * @returns true if successful, false otherwise.
 */
export const UseUpdateAccount = (
  accountId,
  name,
  username,
  password,
  role,
  email,
  token,
  setLoading,
) => {
  const formattedPass = password.length === 0 ? 'none' : password;

  const account = {
    name,
    username,
    password: formattedPass,
    role: { id: role },
    email,
  };
  accountService.updateAccount(accountId, account, token)
    .then(() => {
      setLoading(5);
      setTimeout(() => {
        setLoading(0);
      }, 1000);
    })
    .catch(() => {
      setLoading(6);
      setTimeout(() => {
        setLoading(0);
      }, 3000);
    });
};
