import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/item';

/**
 * Calls the api to get all items for user.
 * @param {String} accountId
 *                 Account id that is calling for items.
 * @param {String} page
 *                 Page of items we want.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns items for user
 */
const getAll = async (accountId, page, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.get(`${baseUrl}/get?accountId=${accountId}&page=${page}&sort=none&sortDir=none`, config);
    return res.data;
  } catch (exception) {
    if (exception.response.data.status === 401) window.location.href = '/login';
  }
  return null;
};

/**
 * Calls the api to get the search of the items.
 * @param {String} accountId
 *                 Account id that is calling for items.
 * @param {String} search
 *                 The used search.
 * @param {String} page
 *                 The wanted page for the results
 * @param {String} sort
 *                 The wanted sort for the results
 * @param {String} sortDir
 *                 The wanted sortDir for the results
 * @param {String} token
 *                 Token of the logged in account.
 * @returns matching results
 */
const getSearch = async (accountId, search, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/search?title=${search}&accountId=${accountId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
  return res.data;
};

/**
 * Calls the api to get sorted results
 * @param {String} accountId
 *                 Account id that is calling for items.
 * @param {String} page
 *                 The wanted page for the results
 * @param {String} sort
 *                 The wanted sort for the results
 * @param {String} sortDir
 *                 The wanted sortDir for the results
 * @param {String} token
 *                 Token of the logged in account.
 * @returns matching results
 */
const getSort = async (accountId, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get?accountId=${accountId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
  return res.data;
};

/**
 * Calls the api to create a new item.
 * @param {json} payload
 *            Payload that has the data to create a new item with.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns created item
 */
const createNew = async (payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(`${baseUrl}/add`, payload, config);
  return res.data;
};

/**
 * Calls the api to delete selected item.
 * @param {String} id
 *        Item to be deleted.
 * @param {String} token
 *                 Token of the logged in account.
 * @returns True if successful, false otherwise.
 */
const deleteItem = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.delete(`${baseUrl}/del?itemId=${id}`, config);
  return res.data;
};

export default {
  getAll, getSearch, getSort, createNew, deleteItem,
};
