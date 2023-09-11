import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import { useGetLocalStorage } from '../../helpers/helperHooks';
import { useNewItem, useSearch } from './allItemsHooks';
import Items from './Items';
import ItemInput from './ItemInput';
import itemService from '../../services/itemService';

/**
 * Renders the all items page.
 * @property {String} className - Custom className if wanted. Default ${className}.
 * @property {String} id - Custom id if wanted. Default ${className}.
 * @returns all items page
 */
const AllItems = ({ className, id }) => {
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState('none');
  const [sortDir, setSortDir] = useState('none');
  const page = useRef(0);

  /**
   * UseEffect loads the token and account id for the user and loads the data on page load.
   */
  useEffect(() => {
    const storage = useGetLocalStorage();

    setToken(storage.token);
    setAccountId(storage.accountId);

    itemService.getAll(storage.accountId, page.current, storage.token)
      .then((res) => setItems(res));
  }, []);

  /**
   * takes in the submit and calls the new item hook to submit it.
   * Acts accordinfg to the result of the hook.
   * @param {function} e
   *        The event that calls this function.
   */
  const handleCreation = (e) => {
    e.preventDefault();
    const values = e.target;
    useNewItem(accountId, values[0].value, values[1].value, token);
  };

  /**
   * Searches with the value in the input field and selected sorts.
   * @param {function} e
   *        The event that calls this function.
   */
  const searchInput = (e) => {
    page.current = 0;
    if (e) e.preventDefault();
    useSearch(accountId, search, page.current, sort, sortDir, token, setItems);
  };

  /**
   * Searches with the selected sort.
   * @param {String} selSort
   *        Selected sort.
   * @param {String} selSortDir
   *        Selected sort direction
   */
  const searchSort = (selSort, selSortDir) => {
    page.current = 0;
    setSort(selSort);
    setSortDir(selSortDir);
    useSearch(accountId, search, page.current, selSort, selSortDir, token, setItems);
  };

  /**
   * Function to move to load the next page of reviews
   */
  const nextPage = () => {
    $('#pagination__prev').prop('disabled', false);
    useSearch(accountId, search, page.current + 1, sort, sortDir, token, setItems);
    page.current += 1;
  };

  /**
  * Function to move to load the previous page of reviews
  */
  const prevPage = () => {
    useSearch(accountId, search, page.current - 1, sort, sortDir, token, setItems);
    page.current -= 1;
    if (page.current === 0) {
      $('#pagination__prev').prop('disabled', true);
    }
  };

  /**
   * Clears the search field when the X is pressed.
   * @param {String} inputId - id of the input field.
   */
  const clearInput = (inputId) => {
    $(`#${inputId}__input`).val(null);
    setSearch('');
    page.current = 0;
    useSearch(accountId, '', 0, sort, sortDir, token, setItems);
  };

  return (
    <div className={className}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__title`} id={`${id}__grid__title`}>
          <span className={`${className}__grid__title__text`}> All your items </span>
        </div>
        <div className={`${className}__grid__items`} id={`${id}__grid__items`}>
          <Items
            items={items}
            setSearch={(e) => setSearch(e)}
            setSort={(selSort, selSortDir) => searchSort(selSort, selSortDir)}
            onSubmit={(e) => searchInput(e)}
            nextPage={() => nextPage()}
            prevPage={() => prevPage()}
            clearInput={clearInput}
          />
        </div>
        <div className={`${className}__grid__fileInput`} id={`${id}__grid__fileInput`}>
          <ItemInput onSubmit={handleCreation} token={token} accountId={accountId} />
        </div>
      </div>
    </div>
  );
};

AllItems.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

AllItems.defaultProps = {
  className: 'allItems',
  id: 'allItems',
};

export default AllItems;
