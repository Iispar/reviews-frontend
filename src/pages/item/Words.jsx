import React from 'react';
import propTypes from 'prop-types';
import TopWords from '../../components/TopWords';

/**
 * Renders the top words component on item page.
 * @property {String} className - Custom className if wanted. Default words.
 * @property {String} id - Custom id if wanted. Default words.
 * @property {List<String>} posWords - List of the most positive words.
 * @property {List<String>} negWords - List of the most negative words.
 * @returns top words component.
 */
const Words = ({
  className, id, posWords, negWords,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__title`} id={`${className}__title`}>
      most common words
    </div>
    <div className={`${className}__positive`} id={`${className}__positive`}>
      {posWords.length > 0 ? (
        <TopWords words={posWords} title="with positive reviews" />
      ) : (
        <div className={`${className}__empty`}> no top pos </div>
      )}
    </div>
    <div className={`${className}__negative`} id={`${className}__negative`}>
      {negWords.length > 0 ? (
        <TopWords words={negWords} title="with negative reviews" />
      ) : (
        <div className={`${className}__empty`}> no top pos </div>
      )}
    </div>
  </div>
);

Words.propTypes = {
  posWords: propTypes.arrayOf(propTypes.string),
  negWords: propTypes.arrayOf(propTypes.string),
  className: propTypes.string,
  id: propTypes.string,
};

Words.defaultProps = {
  negWords: [],
  posWords: [],
  className: 'words',
  id: 'words',
};

export default Words;
