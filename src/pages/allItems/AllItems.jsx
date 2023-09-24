import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import { useGetLocalStorage } from '../../helpers/helperHooks';
import { useNewItem, useSearch } from './allItemsHooks';
import Items from './Items';
import ItemInput from './ItemInput';
import itemService from '../../services/itemService';
import SkeletonLoad from '../../components/SkeletonLoad';
import ActionWait from '../../components/ActionWait';

/**
 * Renders the all items page.
 * @property {String} className - Custom className if wanted. Default ${className}.
 * @property {String} id - Custom id if wanted. Default ${className}.
 * @returns all items page
 */
const AllItems = ({ className, id }) => {
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState('none');
  const [sortDir, setSortDir] = useState('none');
  const [isNextPage, setIsNextPage] = useState(true);
  const [loading, setLoading] = useState(1);
  const page = useRef(0);

  /**
   * UseEffect loads the token and account id for the user and loads the data on page load.
   */
  useEffect(() => {
    const storage = useGetLocalStorage();

    setToken(storage.token);
    setAccountId(storage.accountId);

    itemService.getAll(storage.accountId, page.current, storage.token)
      .then((res) => {
        setItems(res.responseList);
        if (!res.nextPage) setIsNextPage(false);
        setLoading(0);
      });
  }, []);

  /**
   * UseEffect to check if page is last one with values.
   */
  useEffect(() => {
    if (isNextPage) $('#pagination__next').prop('disabled', false);
    else $('#pagination__next').prop('disabled', true);
  }, [isNextPage]);

  /**
   * Reloads the item. Called when a new item is added.
   */
  const reloadItems = () => {
    setLoading(2);
    itemService.getAll(accountId, page.current, token)
      .then((res) => {
        setItems(res.responseList);
        if (!res.nextPage) setIsNextPage(false);
        else setIsNextPage(true);
        setLoading(0);
      });
  };

  /**
   * takes in the submit and calls the new item hook to submit it.
   * Acts accordinfg to the result of the hook.
   * @param {function} e
   *        The event that calls this function.
   */
  const handleCreation = async (e) => {
    setLoading(4);
    e.preventDefault();
    const values = e.target;
    useNewItem(accountId, values[0].value, values[1].value, token, reloadItems, setLoading);
    $(e.target[0]).val('');
  };

  /**
   * Searches with the value in the input field and selected sorts.
   * @param {function} e
   *        The event that calls this function.
   */
  const searchInput = (e) => {
    setLoading(2);
    page.current = 0;
    $('#pagination__prev').prop('disabled', true);
    if (e) e.preventDefault();
    useSearch(
      accountId,
      search,
      page.current,
      sort,
      sortDir,
      token,
      setItems,
      setIsNextPage,
      setLoading,
    );
  };

  /**
   * Searches with the selected sort.
   * @param {String} selSort
   *        Selected sort.
   * @param {String} selSortDir
   *        Selected sort direction
   */
  const searchSort = (selSort, selSortDir) => {
    setLoading(2);
    page.current = 0;
    $('#pagination__prev').prop('disabled', true);
    setSort(selSort);
    setSortDir(selSortDir);
    useSearch(
      accountId,
      search,
      page.current,
      selSort,
      selSortDir,
      token,
      setItems,
      setIsNextPage,
      setLoading,
    );
  };

  /**
   * Function to move to load the next page of reviews
   */
  const nextPage = () => {
    setLoading(2);
    setItems(null);
    $('#pagination__prev').prop('disabled', false);
    useSearch(
      accountId,
      search,
      page.current + 1,
      sort,
      sortDir,
      token,
      setItems,
      setIsNextPage,
      setLoading,
    );
    page.current += 1;
  };

  /**
  * Function to move to load the previous page of reviews
  */
  const prevPage = () => {
    setLoading(2);
    setItems(null);
    useSearch(
      accountId,
      search,
      page.current - 1,
      sort,
      sortDir,
      token,
      setItems,
      setIsNextPage,
      setLoading,
    );
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
    setLoading(2);
    $(`#${inputId}__input`).val('');
    setSearch('');
    page.current = 0;
    $('#pagination__prev').prop('disabled', true);
    useSearch(accountId, '', 0, sort, sortDir, token, setItems, setIsNextPage, setLoading);
  };

  return (
    <div className={className}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__title`} id={`${id}__grid__title`}>
          {loading === 1 ? (
            <SkeletonLoad />
          ) : (<span className={`${className}__grid__title__text`}> All your items </span>)}
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
            loading={loading}
          />
        </div>
        <div className={`${className}__grid__fileInput`} id={`${id}__grid__fileInput`}>
          {loading === 1 ? (
            <SkeletonLoad />
          ) : (<ItemInput onSubmit={handleCreation} token={token} accountId={accountId} />)}
        </div>
      </div>
      {loading === 4 || loading === 5 || loading === 6 ? (
        <ActionWait loading={loading} />
      ) : (<div />)}
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
