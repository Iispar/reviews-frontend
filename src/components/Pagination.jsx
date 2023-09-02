import React, { useEffect } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';

/**
 * Renders the pagination buttons
 * @Property {String} className - Custom classname if wanted. Default is pagination.
 * @Property {id} id - Custom id if wanted. Default is pagination.
 * @Property {Function} next - Function to use when next button is clicked.
 * @Property {Function} prev - Function to use when previous button is clicked.
 * @returns pagination buttons
 */
const Pagination = ({
  next, prev, className, id,
}) => {
  // disables the prev button at load
  useEffect(() => {
    $(`#${id}__prev`).prop('disabled', true);
  }, []);

  return (
    <div className={className} id={id}>
      <button className={`${className}__prev`} id={`${id}__prev`} type="button" onClick={prev}> previous </button>
      <button className={`${className}__next`} id={`${id}__next`} type="button" onClick={next}> next </button>
    </div>
  );
};

Pagination.propTypes = {
  next: propTypes.func,
  prev: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
};

Pagination.defaultProps = {
  next: null,
  prev: null,
  className: 'pagination',
  id: 'pagination',
};

export default Pagination;
