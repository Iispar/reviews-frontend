import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reviews from './Reviews';
import Title from './Title';
import NewReview from './NewReview';
import Words from './Words';
import ItemChart from './ItemChart';
import dummyReviews from '../../data/dummyData/dummyReviews.json';
import dummyWords from '../../data/dummyData/dummyWords.json';

// eslint-disable-next-line arrow-body-style
const Item = () => {
  const newReview = () => {
    console.log('call');
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
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s"
            reviewsCount="102"
            ratingValue="4.2"
            posReviews="72"
            negReviews="30"
          />
        </div>
        <div className="item__grid__reviews">
          <Reviews reviews={dummyReviews.reviews} />
        </div>
        <div className="item__grid__words">
          <Words words={dummyWords.words} />
        </div>
        <div className="item__grid__chart">
          <ItemChart />
        </div>
        <div className="item__grid__new">
          <NewReview onClick={newReview} />
        </div>
        <div className="item__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Item;
