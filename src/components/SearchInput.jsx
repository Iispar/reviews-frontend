import React from 'react';
import propTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SearchInput = (props) => {
  const { title } = props;
  return <input type="text" placeholder={title} />;
};

SearchInput.propTypes = {
  title: propTypes.string,
};

SearchInput.defaultProps = {
  title: null,
};

export default SearchInput;
