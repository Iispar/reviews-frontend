/* eslint-disable import/prefer-default-export */
import pagesService from '../../services/pagesService';
import reviewsService from '../../services/reviewsService';

/**
 * Calls the service to get home data for account.
 * @param {String} accountId
 *        Id of account getting data.
 * @returns home data for account
 */
export const useGetHome = (accountId) => {
  try {
    const res = pagesService.getHome(accountId);
    return res;
  } catch (exception) {
    // TODO: ERROR MESSAGE
    // console.log('wrong credentials');
  }
  return null;
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
 */
export const useGetReviewsForAccount = (accountId, page, token, setLatestReviews) => {
  reviewsService.getReviewsForAccount(accountId, page, token)
    .then((res) => setLatestReviews(res));
};
