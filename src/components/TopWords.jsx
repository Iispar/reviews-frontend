import React from 'react';
import propTypes from 'prop-types';
import WordListItem from './WordListItem';

/**
 * Renders a list of words as a top list.
 * @param {json} words
 *        Json of words. Includes the words name and key.
 * @param {string} className
 *        Custom className id wanted. Default is wordList.
 * @param {string} title
 *        Title of the list.
 * @param {string} id
 *        Custom className id wanted. Default is wordList.
 * @returns list of words
 */
const TopWords = (props) => {
  const { words } = props;
  const { title } = props;
  const { className } = props;
  const { id } = props;
  const createList = (wordList) => {
    const list = [];
    for (let i = 0; i < wordList.length; i += 1) {
      list.push(<WordListItem name={wordList[i].name} index={i} key={wordList[i].key} />);
    }
    return list;
  };
  return (
    <div className={className}>
      <div className={`${className}__title`} id={`${id}__title`}>
        {title}
      </div>
      <div className={`${className}__list`} id={`${id}__list`}>
        {createList(words)}
      </div>
    </div>
  );
};

TopWords.propTypes = {
  words: propTypes.arrayOf(propTypes.objectOf(propTypes.string)),
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
