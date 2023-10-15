import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a single top words list item.
 * @property {string} name - name of the word.
 * @property {string} index - Index of the word.
 * @property {string} id - Custom id if wanted. Default wordListItem.
 * @property {string} className - Custom id if wanted. Default wordListItem.
 * @returns single top word item.
 */
const WordListItem = ({
  name, index, className, id,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__index`} id={`${id}__index`}>
      {index + 1}
      .
    </div>
    <div className={`${className}__name`} id={`${id}__name`}>
      {name}
    </div>
  </div>
);

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
