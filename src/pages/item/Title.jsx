import React from 'react';

// eslint-disable-next-line arrow-body-style
const Title = () => {
  return (
    <div className="itemTitle">
      <div className="itemTitle__info">
        <div className="itemTitle__info__name">
          Item name is this
        </div>
        <div className="itemTitle__info__desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
        </div>
      </div>
      <div className="itemTitle__data">
        <div className="itemTitle__data__reviews">
          reviews
        </div>
        <div className="itemTitle__data__rating">
          rating
        </div>
        <div className="itemTitle__data__positive">
          pos
        </div>
        <div className="itemTitle__data__negative">
          neg
        </div>
      </div>
    </div>
  );
};

export default Title;
