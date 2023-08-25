import React from 'react';
import propTypes from 'prop-types';

/**
 * Creates the pagination buttons
 * @returns pagination buttons
 */
const Pagination = (props) => {
  const { next } = props;
  const { prev } = props;
  return (
    <div className="pagination" id="pagination">
      <button className="pagination__prev" id="pagination__prev" type="button" onClick={() => prev()}> previous </button>
      <button className="pagination__next" id="pagination__next" type="button" onClick={() => next()}> next </button>
    </div>
  );
};

Pagination.propTypes = {
  next: propTypes.func,
  prev: propTypes.func,
};

Pagination.defaultProps = {
  next: null,
  prev: null,
};

export default Pagination;
