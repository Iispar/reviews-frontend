import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/account';

/**
 * Calls the api to get the account with the accountId
 * @param {String} accountId
 *            id of the account we want.
 * @param {String} token
 *            token for the logged in user.
 * @returns found account
 */
const getAccount = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.get(`${baseUrl}/get?accountId=${accountId}`, config);
    return res.data;
  } catch (exception) {
    if (exception.response.data.status === 401) window.location.href = '/login';
  }
  return null;
};

/**
 * Calls the api to update the account with the param id with the data in the payload
 * @param {String} accountId
 *            account id we want to update.
 * @param {json} payload
 *            payload that has the data to update with.
 * @param {String} token
 *            token for the logged in user.
 * @returns updated user.
 */
const updateAccount = async (accountId, payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(`${baseUrl}/update?accountId=${accountId}`, payload, config);
  return res.data;
};

/**
 * Calls the api to delete account from the database.
 * @param {Json} payload
 *        The auth request to delete the account with.
 * @param {String} token
 *        The token of the logged in user.
 * @returns true if succesful.
 */
const deleteAccount = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await axios.delete(`${baseUrl}/del?accountId=${id}`, config)
    .then();
  return true;
};

export default {
  getAccount, updateAccount, deleteAccount,
};
