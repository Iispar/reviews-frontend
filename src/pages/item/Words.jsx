import React from 'react';
import propTypes from 'prop-types';
import TopWords from '../../components/TopWords';

/**
 * Renders the top words content on item page.
 * @returns top words.
 */
const Words = (props) => {
  const { words } = props;
  return (
    <div className="words" id="words">
      <div className="words__title" id="words__title">
        most common words
      </div>
      <div className="words__positive" id="words__positive">
        <TopWords words={words} title="with positive reviews" />
      </div>
      <div className="words__negative" id="words__negative">
        <TopWords words={words} title="with negative reviews" />
      </div>
    </div>
  );
};

Words.propTypes = {
  words: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

Words.defaultProps = {
  words: null,
};

export default Words;
