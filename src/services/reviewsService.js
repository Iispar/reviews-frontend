import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/review';

const getReviewsForAccount = async (accountId, page, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/account?accountId=${accountId}&page=${page}`, config);
  return res.data;
};

const getReviewsForItem = async (itemId, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/item?itemId=${itemId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
  return res.data;
};

const getSearchReviewsForItem = async (itemId, search, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/search?search=${search}&itemId=${itemId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
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
