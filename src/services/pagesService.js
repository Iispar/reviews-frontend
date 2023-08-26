import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/pages';

const getHome = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/home?accountId=${accountId}`, config);
  return res.data;
};

export default { getHome };
