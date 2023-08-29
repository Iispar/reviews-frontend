import React, { useState } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

const DropDownSortMenu = ({
  className, id, setSort, sortOne, sortTwo,
}) => {
  const [open, setOpen] = useState(false);

  /**
   * Sets the hover to a button.
   * @param {string} component - id of the hovered item
   * @param {string} color - color to change the hover to.
   */
  const hover = (component, color) => {
    $(component).hover(
      () => {
        $(component).css('background', color);
      },
      () => {
        $(component).css('background', 'transparent');
      },
    );
  };

  /**
   * Changes the filter and sets it to displayed.
   * @param {String} sort - the selected filter id.
   */
  const changeFilter = async (sort) => {
    const splitSort = sort.split('__')[1];
    const splitSortDir = sort.split('__')[2];

    setSort(splitSort, splitSortDir);

    // we use jquery hover and not css, because we need to disable the hover when clicked.
    // this doesn't seem that good so will look into a better solution in the future.

    // get the sort from the id.
    const type = sort.split('__')[3];
    let width;
    // calculate width of the button based on the length of the sort text.
    if (type === sortOne) width = '80px';
    else width = '70px';

    // use jquery animate instead of css as it works better here.
    $(`#${id}`).animate({
      width,
      height: '20px',
      'margin-top': '0px',
    }, 200);

    // set all the ${sortOne} to invis
    $(`#${id}__${sortOne}__desc`).css('display', 'none');
    $(`#${id}__${sortOne}__asc`).css('display', 'none');
    $(`#${id}__${sortTwo}__desc`).css('display', 'none');
    $(`#${id}__${sortTwo}__asc`).css('display', 'none');

    // selected visible
    $(`#${sort}`).css({ display: 'flex' });
    // disable hover from the button.
    hover(`#${sort}`, 'transparent');

    $(`#${id}__arrow`).css('transform', 'rotate(0deg)');
    setOpen(false);
  };

  /**
       * Animates and opens the dropdown menu for the sort.
       */
  const dropDown = () => {
    // add hover back to all.
    hover(`#${id}__${sortOne}__desc`, '#f5f5f5');
    hover(`#${id}__${sortOne}__asc`, '#f5f5f5');
    hover(`#${id}__${sortTwo}__desc`, '#f5f5f5');
    hover(`#${id}__${sortTwo}__asc`, '#f5f5f5');

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
        <div className={`${className}__btn__arrow`} id={`${id}__btn__arrow`} />
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
