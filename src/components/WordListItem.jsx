import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a single top words list item.
 * @param {*} props
 * @returns sinlge top word item.
 */
const WordListItem = (props) => {
  const { name } = props;
  const { index } = props;
  return (
    <div className="wordListItem">
      <div className="wordListItem__index">
        {index + 1}
        .
      </div>
      <div className="wordListItem__name">
        {name}
      </div>
    </div>
  );
};

WordListItem.propTypes = {
  name: propTypes.string,
  index: propTypes.number,
};

WordListItem.defaultProps = {
  name: null,
  index: null,
};

export default WordListItem;
