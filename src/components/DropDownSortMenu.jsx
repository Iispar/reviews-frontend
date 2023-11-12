import React, { useState } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import { useTextWidth } from '../helpers/componentHelpers';

/**
 * Sort menu with two different sort with ascending and descending order.
 * @property {String} className - Custom classname if wanted. Default is dropDownSortMenu.
 * @property {String} id - Custom id if wanted. Default is dropDownSortMenu.
 * @property {Function} setSort - The set function for to set sort when it is selected.
 * @property {String} sortOne - First wanted sort.
 * @property {String} sortTwo - Second wanted sort.
 * @returns sort menu
 */
const DropDownSortMenu = ({
  className, id, setSort, sortOne, sortTwo,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [width, setWidth] = useState(null);

  /**
   * Changes the filter and sets it to displayed.
   * @param {String} sort - the selected filter.
   */
  const changeFilter = async (sort) => {
    const splitSort = sort.split('-')[0];
    const splitSortDir = sort.split('-')[1];
    setSort(splitSort, splitSortDir);

    // calculate width of the button based on the length of the sort text.
    const newWidth = useTextWidth(splitSort) + 40;
    setWidth(newWidth);

    // use jquery animate instead of css as it works better here.
    $(`#${id}`).animate({
      width: newWidth,
      height: '20px',
    }, 200);

    setSelected(sort);
    setOpen(false);
  };

  /**
       * Animates and opens or closes the dropdown menu for the sort.
       */
  const dropDown = () => {
    // close dropdown
    if (open) {
      if (selected) {
        $(`#${id}`).animate({
          width,
          height: '20px',
        }, 200);
      } else {
        $(`#${id}`).animate({
          width: '44px',
          height: '20px',
        }, 200);
      }

      setOpen(false);

      // open dropdown
    } else {
      $(`#${id}`).animate({
        width: '160px',
        height: '40px',
      }, 200);
      setOpen(true);
    }
  };
  return (
    <div className={`${className}`} id={`${id}`}>
      <button className={`${className}__btn`} id={`${id}__btn`} type="button" onClick={() => dropDown()} style={!open && !selected ? { display: 'flex' } : { display: 'none' }}>
        sort
      </button>
      <div className={`${className}__${sortOne}`} id={`${id}__${sortOne}`}>
        <button
          className={`${className}__${sortOne}__asc`}
          id={`${id}__${sortOne}__asc`}
          type="button"
          onClick={() => changeFilter(`${sortOne}-asc`)}
          style={open || selected === `${sortOne}-asc` ? { display: 'flex' } : { display: 'none' }}
          disabled={selected === `${sortOne}-asc`}
        >
          {sortOne}
          <div className={`${className}__${sortOne}__ascArrow`} />
        </button>
        <button
          className={`${className}__${sortOne}__desc`}
          id={`${id}__${sortOne}__desc`}
          type="button"
          onClick={() => changeFilter(`${sortOne}-desc`)}
          style={open || selected === `${sortOne}-desc` ? { display: 'flex' } : { display: 'none' }}
          disabled={selected === `${sortOne}-desc`}
        >
          {sortOne}
          <div className={`${className}__${sortOne}__descArrow`} />
        </button>
      </div>
      <div className={`${className}__${sortTwo}`} id={`${id}__${sortTwo}`}>
        <button
          className={`${className}__${sortTwo}__asc`}
          id={`${id}__${sortTwo}__asc`}
          type="button"
          onClick={() => changeFilter(`${sortTwo}-asc`)}
          style={open || selected === `${sortTwo}-asc` ? { display: 'flex' } : { display: 'none' }}
          disabled={selected === `${sortTwo}-asc`}
        >
          {sortTwo}
          <div className={`${className}__${sortTwo}__ascArrow`} />
        </button>
        <button
          className={`${className}__${sortTwo}__desc`}
          id={`${id}__${sortTwo}__desc`}
          type="button"
          onClick={() => changeFilter(`${sortTwo}-desc`)}
          style={open || selected === `${sortTwo}-desc` ? { display: 'flex' } : { display: 'none' }}
          disabled={selected === `${sortTwo}-desc`}
        >
          {sortTwo}
          <div className={`${className}__${sortTwo}__descArrow`} />
        </button>
      </div>
      <button className={`${className}__arrow`} id={`${id}__arrow`} type="button" onClick={() => dropDown()} style={open ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}> </button>
    </div>
  );
};

DropDownSortMenu.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  setSort: propTypes.func,
  sortOne: propTypes.string,
  sortTwo: propTypes.string,
};

DropDownSortMenu.defaultProps = {
  className: 'dropDownSortMenu',
  id: 'dropDownSortMenu',
  setSort: null,
  sortOne: 'reviews',
  sortTwo: 'rating',
};

export default DropDownSortMenu;
