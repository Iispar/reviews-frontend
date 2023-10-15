/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';
import LoadingBar from '../../../components/LoadingBar';

const Reviews = ({
  reviews, className, id, setSort, nextPage, prevPage, onSubmit, setSearch, clearSearch, loading,
}) => {
  if (loading === 1 || loading === 2 || loading === 3) {
    if (loading === 1) {
      return (
        <SkeletonLoad />
      );
    }
    return (
      <div>
        <div>
          <div> Reviews </div>
          <div>
            <form onSubmit={(e) => onSubmit(e)}>
              <input placeholder="Serch" onChange={(e) => setSearch(e.target.value)} />
              <button type="button" onClick={() => clearSearch()}> clear </button>
            </form>
            <button type="button" onClick={() => setSort('sort1', 'asc')}> sort1 asc </button>
            <button type="button" onClick={() => setSort('sort1', 'desc')}> sort1 desc </button>
            <button type="button" onClick={() => setSort('sort2', 'asc')}> sort2 asc </button>
            <button type="button" onClick={() => setSort('sort2', 'desc')}> sort2 desc </button>
          </div>
        </div>
        <div className={`${className}__reviews`}>
          <div className="loading">
            {loading === 2 ? (<LoadingBar />) : (<div>error ocurred, please reload</div>)}
          </div>
          <div className={`${className}__reviews__pagination`} id={`${id}__pagination`}>
            <button id="pagination__next" type="button" onClick={() => nextPage()}> next </button>
            <button id="pagination__prev" type="button" onClick={() => prevPage()}> previous </button>
          </div>
        </div>
      </div>
    );
  }
  const revList = [];
  for (let i = 0; i < reviews.length; i += 1) {
    revList.push(
      <div key={i}>
        {reviews[i].date}
        <br />
        {reviews[i].body}
        <br />
        {reviews[i].title}
        <br />
        {reviews[i].rating}
        <br />
        {reviews[i].itemId}
        <br />
      </div>,
    );
  }
  return (
    <div id="words">
      <div>
        <div> Reviews </div>
        <div>
          <form onSubmit={(e) => onSubmit(e)}>
            <input id="test__input" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <button type="button" onClick={() => clearSearch('test')}> clear </button>
          </form>
          <button type="button" onClick={() => setSort('sort1', 'asc')}> sort1 asc </button>
          <button type="button" onClick={() => setSort('sort1', 'desc')}> sort1 desc </button>
          <button type="button" onClick={() => setSort('sort2', 'asc')}> sort2 asc </button>
          <button type="button" onClick={() => setSort('sort2', 'desc')}> sort2 desc </button>
        </div>
      </div>
      { reviews.length > 0 ? (
        <div>
          <div>
            {revList}
          </div>
          <div>
            <button id="pagination__next" type="button" onClick={() => nextPage()}> next </button>
            <button id="pagination__prev" type="button" onClick={() => prevPage()}> previous </button>
          </div>
        </div>
      ) : (
        <div> no reviews </div>
      )}
    </div>
  );
};

export default Reviews;
