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
  const res = await axios.get(`${baseUrl}/get?accountId=${accountId}`, config);
  return res.data;
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

export default { getAccount, updateAccount };
