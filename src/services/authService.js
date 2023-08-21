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

/**
 * Creates a new account to the database with data.
 * @param {String} username
 *        Username used for creation
 * @param {String} name
 *        Name used for creation
 * @param {String} email
 *        Email used for creation
 * @param {String} password
 *        Password used for creation
 * @param {String} role
 *        Role used for creation
 * @returns token
 */
const createAccount = async (username, name, email, password, role) => {
  const payload = {
    username,
    name,
    email,
    password,
    role: { id: role },
  };

  const res = await axios.post(`${baseUrl}/add`, payload);
  return res.data.token;
};

export default { login, createAccount };
