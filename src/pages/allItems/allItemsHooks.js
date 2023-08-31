/* eslint-disable import/prefer-default-export */
import itemService from '../../services/itemService';
/**
 * Creates a new item and posts it to the backend.
 * @param {String} name
 *        Name of the item
 * @param {String} desc
 *        Desciption for the item
 * @param {json} file
 *        File containing all the items reviews
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
    // console.log(`created with ${title}, ${category}`);
    return true;
  } catch (exception) {
    // console.log('error while creating item');
  }
  return false;
};
