import React from 'react';
import propTypes from 'prop-types';
import WordListItem from './WordListItem';

/**
 * Renders a list of words as a top list.
 * @property {json} words - Json of words. Includes the words name and key.
 * @property {string} className - Custom className id wanted. Default is wordList.
 * @property {string} title - Title of the list.
 * @property {string} id - Custom className id wanted. Default is wordList.
 * @returns list of words
 */
const TopWords = ({
  words, title, className, id,
}) => {
  if (words == null) return null;
  const list = [];

  for (let i = 0; i < words.length; i += 1) {
    list.push(
      <WordListItem
        name={words[i]}
        index={i}
        key={`${i}${words[i].key}`}
      />,
    );
  }
  return (
    <div className={className}>
      <div className={`${className}__title`} id={`${id}__title`}>
        {title}
      </div>
      <div className={`${className}__list`} id={`${id}__list`}>
        {list}
      </div>
    </div>
  );
};

TopWords.propTypes = {
  words: propTypes.arrayOf(propTypes.string),
  title: propTypes.string,
  className: propTypes.string,
  id: propTypes.string,
};

TopWords.defaultProps = {
  words: null,
  title: null,
  className: 'wordList',
  id: 'wordList',
};

export default TopWords;
