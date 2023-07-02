import React from 'react';
import propTypes from 'prop-types';

/**
 * renders the new review button component in single item.
 * @property {func} onClick - The function to be called on button being clicked.
 * @property {String} classname - Custom className if wanted. Defaul newReview.
 * @property {String} id - Custom id if wanted. Defaul newReview.
 * @returns
 */
const NewReview = (props) => {
  const { onClick } = props;
  const { className } = props;
  const { id } = props;
  return (
    <div className={className} id={id}>
      <button className={`${className}__button`} id={`${id}__button`} type="button" onClick={() => onClick()}> new review </button>
    </div>
  );
};

NewReview.propTypes = {
  onClick: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
};

NewReview.defaultProps = {
  onClick: null,
  className: 'newReview',
  id: propTypes.string,
};

export default NewReview;
