import React from 'react';
import propTypes from 'prop-types';
import TopWords from '../../components/TopWords';

/**
 * Renders the top words component on item page.
 * @property {String} className - Custom className if wanted. Default words.
 * @property {String} id - Custom id if wanted. Default words.
 * @property {JSON} words - An JSON object containing the words to be displayed.
 * @returns top words.
 */
const Words = (props) => {
  const { className } = props;
  const { id } = props;
  const { words } = props;

  return (
    <div className={className} id={id}>
      <div className={`${className}__title`} id={`${className}__title`}>
        most common words
      </div>
      <div className={`${className}__positive`} id={`${className}__positive`}>
        <TopWords words={words} title="with positive reviews" />
      </div>
      <div className={`${className}__negative`} id={`${className}__negative`}>
        <TopWords words={words} title="with negative reviews" />
      </div>
    </div>
  );
};

Words.propTypes = {
  words: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
};

Words.defaultProps = {
  words: null,
  className: 'words',
  id: 'words',
};

export default Words;
