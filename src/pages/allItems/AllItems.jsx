import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useNewItem } from './allItemsHooks';
import Items from './Items';
import FileInput from './FileInput';
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
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState('none');
  const [sortDir, setSortDir] = useState('none');
  const [page] = useState(0);

  /**
   * UseEffect loads the token and account id for the user and loads the data on page load.
   */
  useEffect(() => {
    const newToken = window.localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    const curAccountId = window.localStorage.getItem('accountId').replace(/^"(.*)"$/, '$1');
    setToken(newToken);
    setAccountId(curAccountId);

    itemService.getAll(curAccountId, page, newToken)
      .then((res) => setItems(res));
  }, []);

  /**
   * takes in the submit and calls the new item hook to submit it.
   * Acts accordinfg to the result of the hook.
   * @param {*} e
   *        Submit data.
   */
  const handleCreation = (e) => {
    e.preventDefault();
    const values = e.target;
    if (useNewItem(accountId, values[0].value, values[1].value, token)) console.log('success');
    else console.log('error');
  };

  /**
   * Searches with the value in the input field and selected sorts.
   * @param {*} e
   */
  const searchInput = (e) => {
    if (e) e.preventDefault();

    itemService.getSearch(accountId, search, page, sort, sortDir, token)
      .then((res) => setItems(res));
  };

  /**
   * Searches with the selected sort.
   * @param {String} selSort
   *        Selected sort.
   * @param {String} selSortDir
   *        Selected sort direction
   */
  const searchSort = (selSort, selSortDir) => {
    setSort(selSort);
    setSortDir(selSortDir);

    itemService.getSort(accountId, page, selSort, selSortDir, token)
      .then((res) => setItems(res));
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
            onSort={(selSort, selSortDir) => searchSort(selSort, selSortDir)}
            onSubmit={(e) => searchInput(e)}
          />
        </div>
        <div className={`${className}__grid__fileInput`} id={`${id}__grid__fileInput`}>
          <FileInput onSubmit={handleCreation} token={token} accountId={accountId} />
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
