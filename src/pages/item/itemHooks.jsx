/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import reviewsService from '../../services/reviewsService';

/**
 * Hook to post new reviews to an item.
 * @param {JSON} reviews the reviews that are to be posted.
 * @returns true if succesfull, false otherwise.
 */
export const UseNewReview = (itemId, accountId, reviews, token) => {
  const payload = [];
  for (let i = 0; i < reviews.length; i += 1) {
    payload.push({
      item: { id: itemId },
      account: { id: accountId },
      title: reviews[i].title,
      body: reviews[i].body,
      date: reviews[i].date,
      rating: 0,
      likes: 0,
      dislikes: 0,
    });
  }
  try {
    reviewsService.createNew(payload, token)
      .then();
    return true;
  } catch (exceptiong) {
    // console.log('error');
  }
  return false;
};
