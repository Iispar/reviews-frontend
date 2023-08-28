/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import reviewsService from '../../services/reviewsService';

/**
 * Hook to post new reviews to an item.
 * @param {JSON} reviews the reviews that are to be posted.
 * @returns true if succesfull, false otherwise.
 */
export const UseNewReview = (itemId, accountId, title, body, date, token) => {
  try {
    reviewsService.createNew(itemId, accountId, title, body, date, token)
      .then();
    return true;
  } catch (exceptiong) {
    console.log('error');
  }
  return false;
};
