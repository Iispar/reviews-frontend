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
      <div className={`${className}`}>
        <div className={`${className}__header`} id={`${id}__header`}>
          <div className={`${className}__header__text`}> Latest reviews </div>
        </div>
        <div className={`${className}__reviews`}>
          <div className="loading">
            {loading === 2 ? (<div> loading </div>) : (<div>error ocurred, please reload</div>)}
          </div>
          <div className={`${className}__reviews__pagination`} id={`${id}__pagination`}>
            <button type="button" onClick={() => nextPage()}> next </button>
            <button type="button" onClick={() => prevPage()}> previous </button>
          </div>
        </div>
      </div>
    );
  }
  for (let i = 0; i < reviews.length; i += 1) {
    reviewList.push(
      <div>
        {reviews[i].date}
        <br />
        {reviews[i].body}
        <br />
        {reviews[i].title}
        <br />
        {reviews[i].rating}
        <br />
        {reviews[i].item.id}
        <br />
      </div>,
    );
  }
  // no waiting
  return (
    <div className={`${className}`}>
      <div className={`${className}__header`} id={`${id}__header`}>
        <div className={`${className}__header__text`}> Latest reviews </div>
      </div>
      {reviews.length > 0 ? (
        <div className={`${className}__reviews`}>
          <div className={`${className}__reviews__list`} id={`${id}__reviews`}>
            {reviewList}
          </div>
          <div className={`${className}__reviews__pagination`} id={`${id}__pagination`}>
            <button type="button" onClick={() => nextPage()}> next </button>
            <button type="button" onClick={() => prevPage()}> previous </button>
          </div>
        </div>
      ) : (
        <div className={`${className}__empty`}> no reviews </div>
      )}
    </div>
  );
};

export default LatestReviews;
