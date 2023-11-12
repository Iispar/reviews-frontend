import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the pagination buttons
 * @Property {String} className - Custom classname if wanted. Default is pagination.
 * @Property {id} id - Custom id if wanted. Default is pagination.
 * @Property {Function} next - Function to use when next button is clicked.
 * @Property {Function} prev - Function to use when previous button is clicked.
 * @Property {Bool} disabled - If prev button is disabled or not
 * @returns pagination buttons
 */
const Pagination = ({
  next, prev, className, id, prevDisabled, nextDisabled,
}) => (
  <div className={className} id={id}>
    <button className={`${className}__prev`} id={`${id}__prev`} type="button" onClick={prev} disabled={prevDisabled}> previous </button>
    <button className={`${className}__next`} id={`${id}__next`} type="button" onClick={next} disabled={nextDisabled}> next </button>
  </div>
);

Pagination.propTypes = {
  next: propTypes.func,
  prev: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
  prevDisabled: propTypes.bool,
  nextDisabled: propTypes.bool,
};

Pagination.defaultProps = {
  next: null,
  prev: null,
  className: 'pagination',
  id: 'pagination',
  prevDisabled: true,
  nextDisabled: true,
};

export default Pagination;
