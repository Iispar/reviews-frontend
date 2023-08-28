import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/review';

const getReviews = async (accountId, page, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/account?accountId=${accountId}&page=${page}`, config);
  return res.data;
};

const getChartForAccount = async (accountId, time, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/chart/account?accountId=${accountId}&time=${time}`, config);
  return res.data;
};

const getChartForItem = async (itemId, time, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/chart/item?itemId=${itemId}&time=${time}`, config);
  return res.data;
};

export default { getReviews, getChartForAccount, getChartForItem };
