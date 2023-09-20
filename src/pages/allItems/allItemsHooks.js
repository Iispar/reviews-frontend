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
 * @param {Function} reloadItems
 *                 reloads the items.
 * @param {Function} setLoading
 *                 setFunction to set the state of loading.
 * @returns true if successful, false if not.
 */
export const useNewItem = (accountId, title, category, token, reloadItems, setLoading) => {
  const payload = [{
    title,
    account: { id: accountId },
    category: { id: category },
    rating: null,
    words: null,
  }];
  itemService.createNew(payload, token)
    .then(() => {
      setLoading(5);
      setTimeout(() => {
        setLoading(0);
        reloadItems();
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
 * @param {Function} setLoading
 *                 setFunction to set the state of loading.
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
  setLoading,
) => {
  if (search) {
    itemService.getSearch(accountId, search, page, sort, sortDir, token)
      .then((res) => {
        setItems(res.responseList);
        setIsNextPage(res.nextPage);
        setLoading(0);
      });
  } else {
    itemService.getSort(accountId, page, sort, sortDir, token)
      .then((res) => {
        setItems(res.responseList);
        setIsNextPage(res.nextPage);
        setLoading(0);
      });
  }
};
