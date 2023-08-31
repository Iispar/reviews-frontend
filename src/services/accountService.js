import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/account';

const getAccount = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get?accountId=${accountId}`, config);
  return res.data;
};

const updateAccount = async (accountId, payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(`${baseUrl}/update?accountId=${accountId}`, payload, config);
  return res.data;
};

export default { getAccount, updateAccount };
