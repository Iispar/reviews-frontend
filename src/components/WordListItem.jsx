import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a single top words list item.
 * @param {string} name
 *        name of the word.
 * @param {string} index
 *        Index of the word.
 * @param {string} id
 *        Custom id if wanted. Default wordListItem.
 * @param {string} className
 *        Custom id if wanted. Default wordListItem.
 * @returns single top word item.
 */
const WordListItem = (props) => {
  const { name } = props;
  const { index } = props;
  const { className } = props;
  const { id } = props;
  return (
    <div className={className}>
      <div className={`${className}__index`} id={`${id}__index`}>
        {index + 1}
        .
      </div>
      <div className={`${className}__name`} id={`${id}__name`}>
        {name}
      </div>
    </div>
  );
};

WordListItem.propTypes = {
  name: propTypes.string,
  index: propTypes.number,
  className: propTypes.string,
  id: propTypes.string,
};

WordListItem.defaultProps = {
  name: null,
  index: null,
  className: 'wordListItem',
  id: 'wordListItem',
};

export default WordListItem;
