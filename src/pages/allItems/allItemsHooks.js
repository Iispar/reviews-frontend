/* eslint-disable import/prefer-default-export */
import itemService from '../../services/itemService';
/**
 * Creates a new item and calls the service to post it to the backend.
 * @param {String} accountId
 *        id of the account creating the item
 * @param {String} title
 *        Title for the item
 * @param {String} category
 *        Category of the item.
 * @Param {String} token
 *        Token of the logged in account.
 * @returns true if successful, false if not.
 */
export const useNewItem = (accountId, title, category, token) => {
  const payload = [{
    title,
    account: { id: accountId },
    category: { id: category },
    rating: null,
    words: null,
  }];
  try {
    itemService.createNew(payload, token)
      .then();
    return true;
  } catch (exception) {
    // console.log('error while creating item');
  }
  return false;
};

/**
 * Calls the service to search with the given parameters.
 * Then sets the results into given setItems function.
 * @param {String} accountId
 *                 Account id used for search
 * @param {String} search
 *                 Search used for search
 * @param {String} page
 *                 Page used for search
 * @param {String} sort
 *                 Sort used for search
 * @param {String} sortDir
 *                 SortDir used for search
 * @param {String} token
 *                 Token of account searching for items.
 * @param {Function} setItems
 *                 setFunction for the results to be set to.
 * @param {Function} setIsNextPage
 *                 setFunction for the res of next page to be set to.
 */
export const useSearch = (
  accountId,
  search,
  page,
  sort,
  sortDir,
  token,
  setItems,
  setIsNextPage,
) => {
  if (search) {
    itemService.getSearch(accountId, search, page, sort, sortDir, token)
      .then((res) => { setItems(res.responseList); setIsNextPage(res.nextPage); });
  } else {
    itemService.getSort(accountId, page, sort, sortDir, token)
      .then((res) => { setItems(res.responseList); setIsNextPage(res.nextPage); });
  }
};
