import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/review`;

/**
 * Calls the api to get reviews for account. Sorts by latest automatically.
 * @param {String} accountId
 *                 Account id that is calling for the page.
 * @param {String} page
 *                 Page of reviews called for.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns reviews for account
 */
const getReviewsForAccount = async (accountId, page, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/account?accountId=${accountId}&page=${page}`, config);
  return res.data;
};

/**
 * Calls the api to get reviews for item
 * @param {String} itemId
 *                 Id of the item you want the reviews for
 * @param {String} page
 *                 Page of the reviews called for.
 * @param {String} sort
 *                 The sort used in the call.
 * @param {String} sortDir
 *                 The sortDir used in the call
 * @param {String} token
 *                 Token of the logged in account.
 * @returns matching reviews
 */
const getReviewsForItem = async (itemId, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/item?itemId=${itemId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
  return res.data;
};

/**
 * Calls the api to get reviews for item with search
 * @param {String} itemId
 *                 Id of the item you want the reviews for
 * @param {String} search
 *                 The used search for the call.
 * @param {String} page
 *                 Page of the reviews called for.
 * @param {String} sort
 *                 The sort used in the call.
 * @param {String} sortDir
 *                 The sortDir used in the call
 * @param {String} token
 *                 Token of the logged in account.
 * @returns matching reviews
 */
const getSearchReviewsForItem = async (itemId, search, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/search?search=${search}&itemId=${itemId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
  return res.data;
};

/**
 * Gets the chart for account
 * @param {String} accountId
 *                 The account id you want the chart for.
 * @param {String} time
 *                 The timespan used for the call.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns chart data for account
 */
const getChartForAccount = async (accountId, time, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/chart/account?accountId=${accountId}&time=${time}`, config);
  return res.data;
};

/**
 * Gets the chart for item
 * @param {String} itemId
 *                 The item id you want the chart for.
 * @param {String} time
 *                 The timespan used for the call.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns chart data for account
 */
const getChartForItem = async (itemId, time, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/chart/item?itemId=${itemId}&time=${time}`, config);
  return res.data;
};

/**
 * Calls the api to create a new review
 * @param {json} payload
 *               The payload that contains the data to create the new review.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns created review
 */
const createNew = async (payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(`${baseUrl}/add`, payload, config);
  return res.data;
};

export default {
  getReviewsForAccount,
  getChartForAccount,
  getChartForItem,
  createNew,
  getReviewsForItem,
  getSearchReviewsForItem,
};
