/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';

const Words = ({
  className, id, posWords, negWords,
}) => {
  if (posWords == null || negWords == null) {
    return (
      <div id={id}>
        <div>
          <SkeletonLoad />
        </div>
        <div>
          <SkeletonLoad />
        </div>
        <div>
          <SkeletonLoad />
        </div>
      </div>
    );
  }
  const posList = [];
  const negList = [];

  for (let i = 0; i < posWords.length; i += 1) {
    posList.push(
      <div key={i}>
        {posWords[i]}
      </div>,
    );
  }
  for (let i = 0; i < negWords.length; i += 1) {
    negList.push(
      <div key={i}>
        {negWords[i]}
      </div>,
    );
  }
  return (
    <div id={id}>
      <div id={`${className}__title`}>
        most common words
      </div>
      <div id={`${className}__positive`}>
        {posWords.length > 0 ? (
          <div>
            with positive reviews
            {posList}
          </div>
        ) : (
          <div> no top pos </div>
        )}
      </div>
      <div id={`${className}__negative`}>
        {negWords.length > 0 ? (
          <div>
            with negative reviews
            {negList}
          </div>
        ) : (
          <div> no top neg </div>
        )}
      </div>
    </div>
  );
};

export default Words;
