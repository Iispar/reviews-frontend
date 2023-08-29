/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import reviewsService from '../../services/reviewsService';

/**
 * Creates the latest review component for the item page.
 * @property {JSON} reviews - a JSON object with the reviews used.
 * @property {String} className - Custom className if wanted. Default reviews.
 * @property {String} id - Custom id if wanted. Default reviews.
 * @returns component for latest reviews
 */
const Reviews = ({
  itemId, initReviews, className, id, token,
}) => {
  const page = useRef(0);
  const [reviews, setReviews] = useState(initReviews);
  const [sort, setSort] = useState('none');
  const [sortBy, setSortBy] = useState('none');
  /**
   * Function to move to load the next page of reviews
   */
  const nextPage = () => {
    $('#pagination__prev').prop('disabled', false);
    reviewsService.getReviewsForItem(itemId, page.current + 1, sort, sortBy, token)
      .then((res) => setReviews(res));
    page.current += 1;
  };

  /**
   * Function to move to load the previous page of reviews
   */
  const prevPage = () => {
    reviewsService.getReviewsForItem(itemId, page.current - 1, sort, sortBy, token)
      .then((res) => setReviews(res));
    page.current -= 1;
    if (page.current === 0) {
      $('#pagination__prev').prop('disabled', true);
    }
  };
  return (
    <div className={className} id={id}>
      <div className={`${className}__header`}>
        <div className={`${className}__header__text`}> Reviews </div>
      </div>
      <div> sort and search </div>
      <div className={`${className}__reviews`}>
        <ReviewsList reviews={reviews} />
      </div>
      <div className={`${className}__pagination`}>
        <Pagination next={() => nextPage()} prev={() => prevPage()} />
      </div>
    </div>
  );
};

Reviews.propTypes = {
  initReviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  token: propTypes.string,
  itemId: propTypes.string,
};

Reviews.defaultProps = {
  initReviews: null,
  className: 'reviews',
  id: 'reviews',
  token: null,
  itemId: null,
};

export default Reviews;
