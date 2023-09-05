import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/account';

/**
 * Calls the api for login
 * @param {String} username
 *        Username used for login
 * @param {String} password
 *        Password used for login
 * @returns token if succesful
 */
const login = async (username, password) => {
  const payload = {
    username,
    password,
  };

  const res = await axios.post(`${baseUrl}/login`, payload);
  return res.data;
};

/**
 * Calls the api to create a new account with data.
 * @param {String} username
 *        Username used for creation
 * @param {json} payload
 *        Data used for the creation. Includes the to be created account.
 * @param {String} role
 *        Role used for creation
 * @returns token
 */
const createAccount = async (payload) => {
  try {
    const res = await axios.post(`${baseUrl}/add`, payload);
    return res.data;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export default { login, createAccount };
