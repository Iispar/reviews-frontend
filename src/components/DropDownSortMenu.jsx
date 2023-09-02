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

  /**
   * Changes the filter and sets it to displayed.
   * @param {String} sort - the selected filter.
   */
  const changeFilter = async (sort) => {
    const splitSort = sort.split('__')[1];
    const splitSortDir = sort.split('__')[2];
    setSort(splitSort, splitSortDir);

    // calculate width of the button based on the length of the sort text.
    const width = useTextWidth(splitSort) + 30;

    // use jquery animate instead of css as it works better here.
    $(`#${id}`).animate({
      width,
      height: '20px',
    }, 200);

    // set all the sorts to invisible
    $(`#${id}__${sortOne}__desc`).css('display', 'none');
    $(`#${id}__${sortOne}__asc`).css('display', 'none');
    $(`#${id}__${sortTwo}__desc`).css('display', 'none');
    $(`#${id}__${sortTwo}__asc`).css('display', 'none');

    // set the selected visible
    $(`#${sort}`).css({ display: 'flex' });
    $(`#${sort}`).prop('disabled', true);
    setSelected(sort);

    // rotate the arrow back
    $(`#${id}__arrow`).css('transform', 'rotate(0deg)');
    setOpen(false);
  };

  /**
       * Animates and opens or closes the dropdown menu for the sort.
       */
  const dropDown = () => {
    // enable the selected button
    $(`#${selected}`).prop('disabled', false);

    // close dropdown
    if (open) {
      $(`#${id}`).animate({
        width: '44px',
        height: '20px',
      }, 200);
      $(`#${id}__${sortOne}__desc`).css('display', 'none');
      $(`#${id}__${sortOne}__asc`).css('display', 'none');
      $(`#${id}__${sortTwo}__desc`).css('display', 'none');
      $(`#${id}__${sortTwo}__asc`).css('display', 'none');
      $(`#${id}__btn`).css('display', 'flex');
      $(`#${id}__arrow`).css('transform', 'rotate(0deg)');
      setOpen(false);

      // open dropdown
    } else {
      $(`#${id}`).animate({
        width: '160px',
        height: '40px',
      }, 200);
      $(`#${id}__${sortOne}__desc`).css('display', 'flex');
      $(`#${id}__${sortOne}__asc`).css('display', 'flex');
      $(`#${id}__${sortTwo}__desc`).css('display', 'flex');
      $(`#${id}__${sortTwo}__asc`).css('display', 'flex');
      $(`#${id}__btn`).css('display', 'none');
      $(`#${id}__arrow`).css('transform', 'rotate(180deg)');
      setOpen(true);
    }
  };
  return (
    <div className={`${className}`} id={`${id}`}>
      <button className={`${className}__btn`} id={`${id}__btn`} type="button" onClick={() => dropDown()}>
        sort
      </button>
      <div className={`${className}__${sortOne}`}>
        <button className={`${className}__${sortOne}__asc`} id={`${id}__${sortOne}__asc`} type="button" onClick={() => changeFilter(`${id}__${sortOne}__asc`)}>
          {sortOne}
          <div className={`${className}__${sortOne}__ascArrow`} />
        </button>
        <button className={`${className}__${sortOne}__desc`} id={`${id}__${sortOne}__desc`} type="button" onClick={() => changeFilter(`${id}__${sortOne}__desc`)}>
          {sortOne}
          <div className={`${className}__${sortOne}__descArrow`} />
        </button>
      </div>
      <div className={`${className}__${sortTwo}`}>
        <button className={`${className}__${sortTwo}__asc`} id={`${id}__${sortTwo}__asc`} type="button" onClick={() => changeFilter(`${id}__${sortTwo}__asc`)}>
          {sortTwo}
          <div className={`${className}__${sortTwo}__ascArrow`} />
        </button>
        <button className={`${className}__${sortTwo}__desc`} id={`${id}__${sortTwo}__desc`} type="button" onClick={() => changeFilter(`${id}__${sortTwo}__desc`)}>
          {sortTwo}
          <div className={`${className}__${sortTwo}__descArrow`} />
        </button>
      </div>
      <button className={`${className}__arrow`} id={`${id}__arrow`} type="button" onClick={() => dropDown()}> </button>
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
