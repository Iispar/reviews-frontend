import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/pages';

/**
 * Calls the api to get home page for account.
 * @param {String} accountId
 *                 Account id that is calling for the page.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns home page data for account
 */
const getHome = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.get(`${baseUrl}/get/home?accountId=${accountId}`, config);
    return res.data;
  } catch (exception) {
    if (exception.response.data.status === 500) window.location.href = '/login';
  }
  return null;
};

/**
 * Calls the api to get item page for account.
 * @param {String} accountId
 *                 Account id that is calling for the page.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns item page data for account
 */
const getItem = async (itemId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.get(`${baseUrl}/get/item?itemId=${itemId}`, config);
    return res.data;
  } catch (exception) {
    if (exception.response.data.status === 500) window.location.href = '/login';
  }
  return null;
};

export default { getHome, getItem };
