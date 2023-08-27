import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/item';

const getAll = async (accountId, page, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get?accountId=${accountId}&page=${page}&sort=none&sortDir=none`, config);
  return res.data;
};

const getSearch = async (accountId, search, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/search?title=${search}&accountId=${accountId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
  return res.data;
};

const getSort = async (accountId, page, sort, sortDir, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get?accountId=${accountId}&page=${page}&sort=${sort}&sortDir=${sortDir}`, config);
  return res.data;
};

const createNew = async (accountId, title, categoryId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const payload = [{
    title,
    account: { id: accountId },
    category: { id: categoryId },
    rating: null,
    words: null,
  }];
  const res = await axios.post(`${baseUrl}/add`, payload, config);
  return res.data;
};

export default {
  getAll, getSearch, getSort, createNew,
};
