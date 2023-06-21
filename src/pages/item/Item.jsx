import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// eslint-disable-next-line arrow-body-style
const Item = () => {
  return (
    <div className="item">
      <div className="item__grid">
        <div className="item__grid__header">
          <Header />
        </div>
        <div className="item__grid__title">
          title
        </div>
        <div className="item__grid__reviews">
          reviews
        </div>
        <div className="item__grid__words">
          common words
        </div>
        <div className="item__grid__chart">
          chart
        </div>
        <div className="item__grid__new">
          add reviews
        </div>
        <div className="item__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Item;
