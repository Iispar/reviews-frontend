import React from 'react';
import propTypes from 'prop-types';
import TopWords from '../../components/TopWords';
import SkeletonLoad from '../../components/SkeletonLoad';

/**
 * Renders the top words component on item page.
 * @property {String} className - Custom className if wanted. Default words.
 * @property {String} id - Custom id if wanted. Default words.
 * @property {List<String>} posWords - List of the most positive words.
 * @property {List<String>} negWords - List of the most negative words.
 * @returns top words component.
 */
const Words = ({
  className, id, posWords, negWords, view,
}) => {
  if (posWords == null || negWords == null) {
    return (
      <div className={className} id={id}>
        <div className={`${className}__loadingTitle`}>
          <SkeletonLoad />
        </div>
        <div className={`${className}__loading`}>
          <SkeletonLoad />
        </div>
        <div className={`${className}__loading`}>
          <SkeletonLoad />
        </div>
      </div>
    );
  }
  return (
    <div className={className} id={id} style={view ? { display: 'none' } : { display: 'flex' }}>
      <div className={`${className}__title`} id={`${className}__title`}>
        most important words
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
          <div className={`${className}__empty`}> no top neg </div>
        )}
      </div>
    </div>
  );
};

Words.propTypes = {
  posWords: propTypes.arrayOf(propTypes.string),
  negWords: propTypes.arrayOf(propTypes.string),
  className: propTypes.string,
  id: propTypes.string,
  view: propTypes.bool,
};

Words.defaultProps = {
  negWords: [],
  posWords: [],
  className: 'words',
  id: 'words',
  view: true,
};

export default Words;
