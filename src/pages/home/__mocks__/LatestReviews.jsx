/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';

const LatestReviews = ({
  className, id, reviews, nextPage, prevPage, loading,
}) => {
  const reviewList = [];
  // if reviews being loaded.
  // if page load
  if (loading === 1) return (<SkeletonLoad />);
  // else waiting for data.
  if (loading === 2 || loading === 3) {
    return (
      <div id="testReviews">
        <div>
          <div> Latest reviews </div>
        </div>
        <div id="testReviews__list">
          <div>
            {loading === 2 ? (<div> loading </div>) : (<div>error ocurred, please reload</div>)}
          </div>
          <div>
            <button id="pagination__next" type="button" onClick={() => nextPage()}> next </button>
            <button id="pagination__prev" type="button" onClick={() => prevPage()}> previous </button>
          </div>
        </div>
      </div>
    );
  }
  for (let i = 0; i < reviews.length; i += 1) {
    reviewList.push(
      <div key={reviews[i].title}>
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
  // no waiting
  return (
    <div id="testReviews">
      <div>
        <div> Latest reviews </div>
      </div>
      {reviews.length > 0 ? (
        <div>
          <div id="testReviews__list">
            {reviewList}
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

export default LatestReviews;
