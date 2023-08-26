import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/review';

const getNewReviews = async (accountId, page, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/account?accountId=${accountId}&page=${page}`, config);
  return res.data;
};

export default { getNewReviews };
