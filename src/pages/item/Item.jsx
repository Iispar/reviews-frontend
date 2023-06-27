import React from 'react';
import $ from 'jquery';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from './Title';
import NewReview from './NewReview';
import Words from './Words';
import ItemChart from './ItemChart';
import Reviews from './Reviews';
import NewReviewForm from './NewReviewForm';
import dummyReviews from '../../data/dummyData/dummyReviews.json';
import dummyWords from '../../data/dummyData/dummyWords.json';

// eslint-disable-next-line arrow-body-style
const Item = () => {
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
    const values = e.target;
    console.log(values);
  };

  return (
    <div className="item">
      <div className="item__grid">
        <div className="item__grid__header">
          <Header />
        </div>
        <div className="item__grid__title">
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
        <div className="item__grid__reviews">
          <Reviews reviews={dummyReviews.reviews} />
        </div>
        <div className="item__grid__words">
          <Words words={dummyWords.words} />
          <NewReviewForm onSubmit={submitReview} onClick={closeNew} />
          <NewReview onClick={newReview} />
        </div>
        <div className="item__grid__chart">
          <ItemChart />
        </div>
        <div className="item__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Item;
