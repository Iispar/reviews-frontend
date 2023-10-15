/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const TopWords = ({
  words, title, className, id,
}) => {
  const list = [];

  for (let i = 0; i < words.length; i += 1) {
    list.push(
      <div key={i}>
        {words[i]}
      </div>,
    );
  }
  return (
    <div id={id}>
      <div id={`${id}__title`}>
        {title}
      </div>
      <div id={`${id}__list`}>
        {list}
      </div>
    </div>
  );
};

export default TopWords;
