/* eslint-disable import/prefer-default-export */
import pagesService from '../../services/pagesService';
import reviewsService from '../../services/reviewsService';

/**
 * Calls the service to get home data for account.
 * @param {String} accountId
 *        Id of account getting data.
 * @returns home data for account
 */
export const UseGetHome = (accountId) => {
  const res = pagesService.getHome(accountId);
  return res;
};

/**
 * Calls the service to get reviews for account with given params.
 * @param {String} accountId
 *        Id of acccount searching for reviews.
 * @param {String} page
 *        Wanted page for results.
 * @param {String} token
 *        Token of logged in user.
 * @param {Function} setLatestReviews
 *        Function to be used to set the results.
 * @param {Function} setIsNextPage
 *        Function to be used to set the res on next page data.
 * @param {Function} setLoading
 *        Function to be used to set the loading status.
 */
export const UseGetReviewsForAccount = (
  accountId,
  page,
  token,
  setLatestReviews,
  setIsNextPage,
  setLoading,
) => {
  reviewsService.getReviewsForAccount(accountId, page, token)
    .then((res) => {
      setLatestReviews(res.responseList);
      setIsNextPage(res.nextPage);
      setLoading(0);
    })
    .catch(() => {
      setLoading(3);
    });
};
