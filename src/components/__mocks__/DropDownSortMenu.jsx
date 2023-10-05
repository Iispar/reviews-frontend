/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const DropDownSortMenu = ({
  className, id, setSort, sortOne, sortTwo,
}) => (
  <div id={id}>
    <button type="button" onClick={() => setSort('sortOne', 'asc')}>
      sortOne asc
    </button>
    <button type="button" onClick={() => setSort('sortOne', 'desc')}>
      sortOne desc
    </button>
    <button type="button" onClick={() => setSort('sortTwo', 'asc')}>
      sortTwo asc
    </button>
    <button type="button" onClick={() => setSort('sortTwo', 'desc')}>
      sortTwo desc
    </button>
  </div>
);

export default DropDownSortMenu;
