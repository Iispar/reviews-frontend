import React from 'react';
import TopWords from '../../components/TopWords';
import dummy from '../../data/dummyData/dummyWords.json';

/**
 * Renders the top words content on item page.
 * @returns top words.
 */
// eslint-disable-next-line arrow-body-style
const Words = () => {
  return (
    <div className="words">
      <div className="words__title">
        most common words
      </div>
      <div className="words__positive">
        <TopWords words={dummy.words} title="with positive reviews" />
      </div>
      <div className="words__negative">
        <TopWords words={dummy.words} title="with negative reviews" />
      </div>
    </div>
  );
};

export default Words;
