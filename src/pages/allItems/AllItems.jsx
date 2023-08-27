import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
// import { useNewItem } from './allItemsHooks';
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

  useEffect(() => {
    const newToken = window.localStorage.getItem('token');
    const curAccount = window.localStorage.getItem('accountId');
    setToken(newToken);
    setAccountId(curAccount);

    itemService.getAll(curAccount, 0, newToken)
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
    // commented for eslint errors as the hook doesn't have fucntionality yet.
    // const values = e.target;
    // would try catch be better here?
    // if (useNewItem(values[0].value, values[1].value, values[2].value)) console.log('success');
    // else console.log('error');
  };

  const submit = (e) => {
    if (e) e.preventDefault();
    console.log(search);
    console.log(search, sort, sortDir);
  };

  const searchSort = (selSort, selSortDir) => {
    console.log(selSort, selSortDir);
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
            setSort={(e) => setSort(e)}
            setSortDir={(e) => setSortDir(e)}
            onSort={(selSort, selSortDir) => searchSort(selSort, selSortDir)}
            onSubmit={(e) => submit(e)}
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
