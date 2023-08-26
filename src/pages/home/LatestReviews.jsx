import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import ReviewsList from '../../components/ReviewsList';
import Pagination from '../../components/Pagination';
import reviewsService from '../../services/reviewsService';

/**
 * Creates the latest review component used on the home page.
 * @property {JSON} reviews - Json object containing the displayed reviews.
 * @property {String} className - Custom className if wanted. Default latestReviews.
 * @property {String} id - Custom id if wanted. Default latestReviews.
 * @property {Integer} accountId - Id of account using latestReviews
 * @property {String} token - Accounts token
 * @returns latest reviews component
 */
const LatestReviews = (props) => {
  const { className } = props;
  const { id } = props;
  const { initReviews } = props;
  const { accountId } = props;
  const { token } = props;

  const page = useRef(0);
  const [reviews, setReviews] = useState(initReviews);

  const nextPage = () => {
    $('#pagination__prev').prop('disabled', false);
    reviewsService.getNewReviews(accountId, page.current + 1, token)
      .then((res) => setReviews(res));
    page.current += 1;
  };

  const prevPage = () => {
    reviewsService.getNewReviews(accountId, page.current - 1, token)
      .then((res) => setReviews(res));
    page.current -= 1;
    if (page.current === 0) {
      $('#pagination__prev').prop('disabled', true);
    }
  };

  return (
    <div className={`${className}`}>
      <div className={`${className}__header`} id={`${id}__header`}>
        <div className={`${className}__header__text`}> Latest reviews </div>
      </div>
      <div className={`${className}__reviews`} id={`${id}__reviews`}>
        <ReviewsList reviews={reviews} />
      </div>
      <div className={`${className}__pagination`} id={`${id}__pagination`}>
        <Pagination next={() => nextPage()} prev={() => prevPage()} id="pagination" />
      </div>
    </div>
  );
};

LatestReviews.propTypes = {
  initReviews: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
  accountId: propTypes.number,
  token: propTypes.string,
};

LatestReviews.defaultProps = {
  initReviews: [],
  className: 'latestReviews',
  id: 'latestReviews',
  accountId: null,
  token: null,
};

export default LatestReviews;
