import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/account';

/**
 * Calls the backend for login
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
  return res.data.token;
};

export default { login };
