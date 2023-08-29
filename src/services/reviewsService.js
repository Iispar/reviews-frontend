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

const createNew = async (itemId, accountId, title, body, date, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const payload = [{
    item: { id: itemId },
    account: { id: accountId },
    title,
    body,
    date,
    rating: 0,
    likes: 0,
    dislikes: 0,
  }];
  const res = await axios.post(`${baseUrl}/add`, payload, config);
  return res.data;
};

export default {
  getReviewsForAccount, getChartForAccount, getChartForItem, createNew, getReviewsForItem,
};
