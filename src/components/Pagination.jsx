import React from 'react';

/**
 * Creates pagination buttons
 * @returns pagination buttons
 */
// eslint-disable-next-line arrow-body-style
const Pagination = () => {
  return (
    <div className="pagination">
      <button className="pagination__prev" type="button"> previous </button>
      <button className="pagination__next" type="button"> next </button>
    </div>
  );
};

export default Pagination;
