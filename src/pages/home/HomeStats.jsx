import React from 'react';

// eslint-disable-next-line arrow-body-style
const HomeStats = () => {
  return (
    <div className="homeStats">
      <div className="homeStats__ratings" />
      <div className="homeStats__allTime">
        <div className="homeStats__allTime__stats">
          <div className="homeStats__allTime__stats__items">
            <span className="homeStats__allTime__stats__items__value"> 21 </span>
            <span className="homeStats__allTime__stats__items__label"> items </span>
          </div>
          <div className="homeStats__allTime__stats__reviews">
            <span className="homeStats__allTime__stats__reviews__value"> 320 </span>
            <span className="homeStats__allTime__stats__reviews__label"> reviews </span>
          </div>
          <div className="homeStats__allTime__stats__ratings">
            <span className="homeStats__allTime__stats__ratings__value"> 3.2 </span>
            <span className="homeStats__allTime__stats__ratings__label"> avg rating </span>
          </div>
        </div>
        <div className="homeStats__allTime__title"> all time</div>
      </div>
    </div>
  );
};

export default HomeStats;
