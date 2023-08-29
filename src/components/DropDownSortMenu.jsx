import React, { useState } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

const DropDownSortMenu = ({
  className, id, setSort,
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
    if (type === 'reviews') width = '80px';
    else width = '70px';

    // use jquery animate instead of css as it works better here.
    $(`#${id}`).animate({
      width,
      height: '20px',
      'margin-top': '0px',
    }, 200);

    // set all the reviews to invis
    $(`#${id}__reviews__desc`).css('display', 'none');
    $(`#${id}__reviews__asc`).css('display', 'none');
    $(`#${id}__rating__desc`).css('display', 'none');
    $(`#${id}__rating__asc`).css('display', 'none');

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
    hover(`#${id}__reviews__desc`, '#f5f5f5');
    hover(`#${id}__reviews__asc`, '#f5f5f5');
    hover(`#${id}__rating__desc`, '#f5f5f5');
    hover(`#${id}__rating__asc`, '#f5f5f5');

    // close dropdown
    if (open) {
      $(`#${id}`).animate({
        width: '44px',
        height: '20px',
      }, 200);
      $(`#${id}__reviews__desc`).css('display', 'none');
      $(`#${id}__reviews__asc`).css('display', 'none');
      $(`#${id}__rating__desc`).css('display', 'none');
      $(`#${id}__rating__asc`).css('display', 'none');
      $(`#${id}__btn`).css('display', 'flex');
      $(`#${id}__arrow`).css('transform', 'rotate(0deg)');
      setOpen(false);

      // open dropdown
    } else {
      $(`#${id}`).animate({
        width: '160px',
        height: '40px',
      }, 200);
      $(`#${id}__reviews__desc`).css('display', 'flex');
      $(`#${id}__reviews__asc`).css('display', 'flex');
      $(`#${id}__rating__desc`).css('display', 'flex');
      $(`#${id}__rating__asc`).css('display', 'flex');
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
      <div className={`${className}__reviews`}>
        <button className={`${className}__reviews__asc`} id={`${id}__reviews__asc`} type="button" onClick={() => changeFilter(`${id}__reviews__asc`)}>
          reviews
          <div className={`${className}__reviews__ascArrow`} />
        </button>
        <button className={`${className}__reviews__desc`} id={`${id}__reviews__desc`} type="button" onClick={() => changeFilter(`${id}__reviews__desc`)}>
          reviews
          <div className={`${className}__reviews__descArrow`} />
        </button>
      </div>
      <div className={`${className}__rating`}>
        <button className={`${className}__rating__asc`} id={`${id}__rating__asc`} type="button" onClick={() => changeFilter(`${id}__rating__asc`)}>
          rating
          <div className={`${className}__rating__ascArrow`} />
        </button>
        <button className={`${className}__rating__desc`} id={`${id}__rating__desc`} type="button" onClick={() => changeFilter(`${id}__rating__desc`)}>
          rating
          <div className={`${className}__rating__descArrow`} />
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
};

DropDownSortMenu.defaultProps = {
  className: 'dropDownSortMenu',
  id: 'dropDownSortMenu',
  setSort: null,
};

export default DropDownSortMenu;
