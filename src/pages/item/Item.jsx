import React from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import Title from './Title';
import NewReview from './NewReview';
import Words from './Words';
import ItemChart from './ItemChart';
import Reviews from './Reviews';
import NewReviewForm from './NewReviewForm';
import dummyReviews from '../../data/dummyData/dummyReviews.json';
import dummyWords from '../../data/dummyData/dummyWords.json';

/**
 * Renders the single Item page.
 * @property {String} className - Custom className if wanted. Default item.
 * @property {String} id - Custom id if wanted. Default item.
 * @returns single item page
 */
const Item = (props) => {
  const { className } = props;
  const { id } = props;

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
            name="item name"
            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since"
            reviewsCount="102"
            ratingValue="4.3"
            posReviews="72"
            negReviews="30"
          />
        </div>
        <div className={`${className}__grid__reviews`} id={`${className}__grid__reviews`}>
          <Reviews reviews={dummyReviews.reviews} />
        </div>
        <div className={`${className}__grid__words`} id={`${className}__grid__words`}>
          <Words words={dummyWords.words} />
          <NewReviewForm onSubmit={submitReview} onClick={closeNew} />
          <NewReview onClick={newReview} />
        </div>
        <div className={`${className}__grid__chart`} id={`${className}__grid__chart`}>
          <ItemChart />
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
