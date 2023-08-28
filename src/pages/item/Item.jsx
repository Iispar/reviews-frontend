import React, { useEffect, useState } from 'react';
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
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [accountId, setAccountId] = useState(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const newToken = window.localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    const curAccountId = window.localStorage.getItem('accountId').replace(/^"(.*)"$/, '$1');

    setToken(newToken);
    setAccountId(curAccountId);

    pagesService.getItem(itemId, newToken)
      .then((res) => {
        setReviews(res.latestReviews);
        setPosWords(res.topPos.slice(0, 5));
        setNegWords(res.topNeg.slice(0, 5));
        setChart(res.chart);
        setTitle(res.title);
        setRating(res.rating.toString());
        setReviewsCount(res.reviews);
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
    e.preventDefault();
    // if (UseNewReview(e.target[0].value)) console.log('success');
    // else console.log('failure');
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
          <Reviews reviews={reviews} />
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
