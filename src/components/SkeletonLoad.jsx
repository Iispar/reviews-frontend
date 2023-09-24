import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a skeleton load.
 * @property {String} className - custom className if wanted. Default is loading__beat
 * @property {String} id - custom id if wanted. Default is loading_beat
 * @returns the skeletonLoad
 */
const SkeletonLoad = ({ className, id }) => (
  <div className={className} id={id} />
);

SkeletonLoad.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

SkeletonLoad.defaultProps = {
  id: 'loading__beat',
  className: 'loading__beat',
};

export default SkeletonLoad;
