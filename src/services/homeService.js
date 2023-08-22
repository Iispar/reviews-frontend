import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/pages/get';

const getHome = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/home?accountId=${accountId}`, config);
  return res.data;
};

export default { getHome };
