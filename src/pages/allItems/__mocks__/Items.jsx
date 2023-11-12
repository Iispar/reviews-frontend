/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';

const Items = ({
  items,
  onSubmit,
  setSort,
  setSearch,
  nextPage,
  prevPage,
  clearInput,
  loading,
  prevDisabled,
  nextDisabled,
}) => {
  if (loading === 1) {
    return (
      <SkeletonLoad />
    );
  }
  if (loading === 2 || loading === 3) {
    return (
      <div id="mockItems">
        <div id="mockItems__form">
          <form onSubmit={(e) => onSubmit(e)}>
            <input id="mockSearch" placeholder="Search" onChange={setSearch} />
            <button type="button" onClick={clearInput}> clear </button>
            <button type="submit"> search </button>
          </form>
        </div>
        <div id="mockItems__sorts">
          <button type="button" onClick={() => setSort('sort1', 'asc')}> sort1 asc </button>
          <button type="button" onClick={() => setSort('sort1', 'desc')}> sort1 desc </button>
          <button type="button" onClick={() => setSort('sort2', 'asc')}> sort2 asc </button>
          <button type="button" onClick={() => setSort('sort2', 'asc')}> sort2 desc </button>
        </div>
        <div className="loading" id="loading">
          {loading === 2 ? (<div> loadingBar </div>) : (<div>error ocurred, please reload</div>)}
        </div>
        <div id="mockItems__pagination">
          <button type="button" onClick={() => nextPage()} disabled={nextDisabled}> next </button>
          <button type="button" onClick={() => prevPage()} disabled={prevDisabled}> previous </button>
        </div>
      </div>
    );
  }
  const itemList = [];
  for (let i = 0; i < items.length; i += 1) {
    itemList.push(
      <div id="mockItem" key={items[i].id}>
        {items[i].title}
        {items[i].reviews}
        + reviews
        {items[i].rating}
        + rating
      </div>,
    );
  }
  return (
    <div id="mockItems">
      <div id="mockItems__form">
        <form onSubmit={(e) => onSubmit(e)}>
          <input id="mockSearch__input" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
          <button type="button" onClick={() => clearInput('mockSearch')}> clear </button>
          <button type="submit"> search </button>
        </form>
      </div>
      <div id="mockItems__sorts">
        <button type="button" onClick={() => setSort('sort1', 'asc')}> sort1 asc </button>
        <button type="button" onClick={() => setSort('sort1', 'desc')}> sort1 desc </button>
        <button type="button" onClick={() => setSort('sort2', 'asc')}> sort2 asc </button>
        <button type="button" onClick={() => setSort('sort2', 'desc')}> sort2 desc </button>
      </div>
      <div id="mockItems__items">
        {itemList}
      </div>
      ,
      <div id="mockItems__pagination">
        <button id="pagination__next" type="button" onClick={() => nextPage()} disabled={nextDisabled}> next </button>
        <button id="pagination__prev" type="button" onClick={() => prevPage()} disabled={prevDisabled}> previous </button>
      </div>
    </div>
  );
};

export default Items;
