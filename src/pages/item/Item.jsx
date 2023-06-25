import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reviews from './Reviews';
import Title from './Title';
import NewReview from './NewReview';
import Words from './Words';
import ItemChart from './ItemChart';

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
          <Title />
        </div>
        <div className="item__grid__reviews">
          <Reviews />
        </div>
        <div className="item__grid__words">
          <Words />
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
