import React from 'react';
import propTypes from 'prop-types';

/**
 * renders the new review button in single item.
 * @returns
 */
const NewReview = (props) => {
  const { onClick } = props;
  return (
    <div className="newReview" id="newReview">
      <button className="newReview__button" id="newReview__button" type="button" onClick={() => onClick()}> new review </button>
    </div>
  );
};

NewReview.propTypes = {
  onClick: propTypes.func,
};

NewReview.defaultProps = {
  onClick: null,
};

export default NewReview;
