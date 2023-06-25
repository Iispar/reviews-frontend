import React from 'react';
import propTypes from 'prop-types';
import WordListItem from './WordListItem';

/**
 * Renders a list of words as a top list.
 * @param {*} props
 * @returns list of words
 */
const TopWords = (props) => {
  const { words } = props;
  const { title } = props;
  const createList = (wordList) => {
    const list = [];
    for (let i = 0; i < wordList.length; i += 1) {
      list.push(<WordListItem name={wordList[i].name} index={i} />);
    }
    return list;
  };
  return (
    <div className="wordList">
      <div className="wordList__title">
        {title}
      </div>
      <div className="wordList__list">
        {createList(words)}
      </div>
    </div>
  );
};

TopWords.propTypes = {
  words: propTypes.string,
  title: propTypes.string,
};

TopWords.defaultProps = {
  words: null,
  title: null,
};

export default TopWords;
