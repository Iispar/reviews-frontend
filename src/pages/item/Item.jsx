/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Title from './Title';
import NewReview from './NewReview';
import Words from './Words';
import ItemChart from './ItemChart';
import Reviews from './Reviews';
import NewReviewForm from './NewReviewForm';
import pagesService from '../../services/pagesService';
import { UseNewReview } from './itemHooks';
import reviewsService from '../../services/reviewsService';

/**
 * Renders the single Item page.
 * @property {String} className - Custom className if wanted. Default item.
 * @property {String} id - Custom id if wanted. Default item.
 * @returns single item page
 */
const Item = ({ className, id }) => {
  const { itemId } = useParams();
  const [title, setTitle] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const [posWords, setPosWords] = useState(null);
  const [negWords, setNegWords] = useState(null);
  const [posReviews, setPosReviews] = useState(null);
  const [negReviews, setNegReviews] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(null);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [chart, setChart] = useState(null);
  const [sort, setSort] = useState('none');
  const [search, setSearch] = useState(null);
  const [sortDir, setSortDir] = useState('none');
  const page = useRef(0);

  useEffect(() => {
    const newToken = window.localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    const curAccountId = window.localStorage.getItem('accountId').replace(/^"(.*)"$/, '$1');

    setToken(newToken);
    setAccountId(curAccountId);

    pagesService.getItem(itemId, newToken)
      .then((res) => {
        setReviews(res.reviews);
        setPosWords(res.topPos.slice(0, 5));
        setNegWords(res.topNeg.slice(0, 5));
        setChart(res.chart);
        setTitle(res.title);
        setRating(res.rating.toString());
        setReviewsCount(res.reviewsCount);
        setPosReviews(res.positiveReviews);
        setNegReviews(res.negativeReviews);
      });
  }, []);
  const newReview = () => {
    $('#words').css('display', 'none');
    $('#newReview').css('display', 'none');
    $('#newReviewForm').css('display', 'flex');
  };

  const closeNew = () => {
    $('#words').css('display', 'flex');
    $('#newReview').css('display', 'flex');
    $('#newReviewForm').css('display', 'none');
  };

  const submitReview = (e) => {
    UseNewReview(itemId, accountId, e.target[0].value, e.target[1].value, e.target[2].value, token);
  };

  /**
   * Function to move to load the next page of reviews
   */
  const nextPage = () => {
    $('#pagination__prev').prop('disabled', false);
    reviewsService.getReviewsForItem(itemId, page.current + 1, sort, sortDir, token)
      .then((res) => setReviews(res));
    page.current += 1;
  };

  /**
     * Function to move to load the previous page of reviews
     */
  const prevPage = () => {
    reviewsService.getReviewsForItem(itemId, page.current - 1, sort, sortDir, token)
      .then((res) => setReviews(res));
    page.current -= 1;
    if (page.current === 0) {
      $('#pagination__prev').prop('disabled', true);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    console.log(search, sort, sortDir);
  };

  return (
    <div className={className} id={id}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__title`} id={`${className}__grid__title`}>
          <Title
            name={title}
            reviewsCount={reviewsCount}
            ratingValue={rating}
            posReviews={posReviews}
            negReviews={negReviews}
          />
        </div>
        <div className={`${className}__grid__reviews`} id={`${className}__grid__reviews`}>
          <Reviews
            reviews={reviews}
            setSort={setSort}
            setSortDir={setSortDir}
            nextPage={() => nextPage()}
            prevPage={() => prevPage()}
            onSubmit={(e) => onSearch(e)}
            setSearch={setSearch}
          />
        </div>
        <div className={`${className}__grid__words`} id={`${className}__grid__words`}>
          <Words posWords={posWords} negWords={negWords} />
          <NewReviewForm onSubmit={submitReview} onClick={closeNew} />
          <NewReview onClick={newReview} />
        </div>
        <div className={`${className}__grid__chart`} id={`${className}__grid__chart`}>
          <ItemChart curData={chart} key={chart} itemId={itemId} token={token} />
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Item.defaultProps = {
  className: 'item',
  id: 'item',
};

export default Item;
