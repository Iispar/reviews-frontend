import React, { useEffect } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';

/**
 * Creates the pagination buttons
 * @returns pagination buttons
 */
const Pagination = (props) => {
  const { next } = props;
  const { prev } = props;
  const { className } = props;
  const { id } = props;

  // disables the prev button at load
  useEffect(() => {
    $(`#${id}__prev`).prop('disabled', true);
  }, []);

  return (
    <div className={className} id={id}>
      <button className={`${className}__prev`} id={`${id}__prev`} type="button" onClick={prev}> previous </button>
      <button className={`${className}__prev`} id={`${id}__prev`} type="button" onClick={next}> next </button>
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
