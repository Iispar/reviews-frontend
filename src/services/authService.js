import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/account`;

/**
 * Calls the api for login
 * @param {String} payload
 *        The data as payload
 * @returns token if succesful
 */
const login = async (payload) => {
  const res = await axios.post(`${baseUrl}/login`, payload);
  return res.data;
};

/**
 * Calls the api to create a new account with data.
 * @param {json} payload
 *        Data used for the creation. Includes the to be created account.
 * @returns token
 */
const createAccount = async (payload) => {
  const res = await axios.post(`${baseUrl}/add`, payload);
  return res.data;
};

export default { login, createAccount };
