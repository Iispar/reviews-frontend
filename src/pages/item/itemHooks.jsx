/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import reviewsService from '../../services/reviewsService';

/**
 * Hook to call the service to post new reviews to an item.
 * @param {String} itemId
 *        The item id you are adding reviews for.
 * @param {String} accountId
 *        The id of account adding reviews.
 * @param {List<json>} reviews
 *        The reviews to be added.
 * @param {String} token
 *        The token of the logged in account.
 * @param {Function} reloadReviews
 *                 reloads the reviews.
 * @param {Function} setLoading
 *                 setFunction to set the state of loading.
 * @returns true if succesfull, false otherwise.
 */
export const UseNewReview = (itemId, accountId, reviews, token, reloadReviews, setLoading) => {
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

  reviewsService.createNew(payload, token)
    .then(() => {
      setLoading(5);
      setTimeout(() => {
        setLoading(0);
        reloadReviews();
      }, 1000);
    })
    .catch(() => {
      setLoading(6);
      setTimeout(() => {
        setLoading(0);
      }, 3000);
    });
};

/**
 * Hook to call the service to get reviews for item.
 * @param {String} itemId
 *        The id for the item you are getting reviews for.
 * @param {String} search
 *        The serach to be used.
 * @param {String} page
 *        The page to be used.
 * @param {String} sort
 *        The sort to be used.
 * @param {String} sortDir
 *        The sort direction to be used.
 * @param {String} token
 *        The token for the logged in account.
 * @param {Function} setReviews
 *        Function to set the response the res
 * @param {Function} setIsNextPage
 *        Function to set for the next page of results.
  * @param {Function} setLoading
 *        Function to set the state of loading
 */
export const UseGetReviews = (
  itemId,
  search,
  page,
  sort,
  sortDir,
  token,
  setReviews,
  setIsNextPage,
  setLoading,
) => {
  if (search) {
    reviewsService
      .getSearchReviewsForItem(itemId, search, page, sort, sortDir, token)
      .then((res) => {
        setReviews(res.responseList);
        setIsNextPage(res.nextPage);
        setLoading(0);
      })
      .catch(() => {
        setLoading(3);
      });
  } else {
    reviewsService.getReviewsForItem(itemId, page, sort, sortDir, token)
      .then((res) => {
        setReviews(res.responseList);
        setIsNextPage(res.nextPage);
        setLoading(0);
      })
      .catch(() => {
        setLoading(3);
      });
  }
};
