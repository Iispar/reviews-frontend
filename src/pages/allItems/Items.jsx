import { React, useState } from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import ItemList from '../../components/ItemList';
import LargeItem from '../../components/LargeItem';
import SearchField from '../../components/SearchField';

/**
 * Renders the items component on the allItems page
 * @propert {JSON} items - JSON object that contains all the items.
 * @propert {String} className - custom className if wanted. Default items.
 * @propert {String} id - custom id if wanted. Default items.
 * @returns items component for ALlItems page
 */
const Items = (props) => {
  const { items } = props;
  const { className } = props;
  const { id } = props;
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
   * Animates and opens the dropdown menu for the sort.
   */
  const dropDown = () => {
    // add hover back to all.
    hover(`#${id}__header__sort__reviews__desc`, '#f5f5f5');
    hover(`#${id}__header__sort__reviews__asc`, '#f5f5f5');
    hover(`#${id}__header__sort__ratings__desc`, '#f5f5f5');
    hover(`#${id}__header__sort__ratings__asc`, '#f5f5f5');

    // close dropdown
    if (open) {
      $(`#${id}__header__sort`).animate({
        width: '44px',
        height: '20px',
      }, 200);
      $(`#${id}__header__sort__reviews__desc`).css('display', 'none');
      $(`#${id}__header__sort__reviews__asc`).css('display', 'none');
      $(`#${id}__header__sort__ratings__desc`).css('display', 'none');
      $(`#${id}__header__sort__ratings__asc`).css('display', 'none');
      $(`#${id}__header__sort__btn`).css('display', 'flex');
      $(`#${id}__header__sort__arrow`).css('transform', 'rotate(0deg)');
      setOpen(false);

    // open dropdown
    } else {
      $(`#${id}__header__sort`).animate({
        width: '160px',
        height: '40px',
      }, 200);
      $(`#${id}__header__sort__reviews__desc`).css('display', 'flex');
      $(`#${id}__header__sort__reviews__asc`).css('display', 'flex');
      $(`#${id}__header__sort__ratings__desc`).css('display', 'flex');
      $(`#${id}__header__sort__ratings__asc`).css('display', 'flex');
      $(`#${id}__header__sort__btn`).css('display', 'none');
      $(`#${id}__header__sort__arrow`).css('transform', 'rotate(180deg)');
      setOpen(true);
    }
  };

  /**
   * Changes the filter and sets it to displayed.
   * @param {String} sort - the selected filter id.
   */
  const changeFilter = (sort) => {
    // we use jquery hover and not css, because we need to disable the hover when clicked.
    // this doesn't seem that good so will look into a better solution in the future.

    // get the sort from the id.
    const type = sort.split('__')[3];
    let width;
    // calculate width of the button based on the length of the sort text.
    if (type === 'reviews') width = '80px';
    else width = '70px';

    // use jquery animate instead of css as it works better here.
    $(`#${id}__header__sort`).animate({
      width,
      height: '20px',
      'margin-top': '0px',
    }, 200);

    // set all the reviews to invis
    $(`#${id}__header__sort__reviews__desc`).css('display', 'none');
    $(`#${id}__header__sort__reviews__asc`).css('display', 'none');
    $(`#${id}__header__sort__ratings__desc`).css('display', 'none');
    $(`#${id}__header__sort__ratings__asc`).css('display', 'none');

    // selected visible
    $(`#${sort}`).css({ display: 'flex' });
    // disable hover from the button.
    hover(`#${sort}`, 'transparent');

    $(`#${id}__header__sort__arrow`).css('transform', 'rotate(0deg)');
    setOpen(false);
  };

  return (
    <div className={className}>
      <div className={`${className}__header`}>
        <div className={`${className}__header__search`}>
          <SearchField placeholder="Search" />
        </div>
        <div className={`${className}__header__sort`} id={`${id}__header__sort`}>
          <button className={`${className}__header__sort__btn`} id={`${id}__header__sort__btn`} type="button" onClick={() => dropDown()}>
            sort
            <div className={`${className}__header__sort__btn__arrow`} id={`${id}__header__sort__btn__arrow`} />
          </button>
          <div className={`${className}__header__sort__reviews`}>
            <button className={`${className}__header__sort__reviews__asc`} id={`${id}__header__sort__reviews__asc`} type="button" onClick={() => changeFilter(`${id}__header__sort__reviews__asc`)}>
              reviews
              <div className={`${className}__header__sort__reviews__ascArrow`} />
            </button>
            <button className={`${className}__header__sort__reviews__desc`} id={`${id}__header__sort__reviews__desc`} type="button" onClick={() => changeFilter(`${id}__header__sort__reviews__desc`)}>
              reviews
              <div className={`${className}__header__sort__reviews__descArrow`} />
            </button>
          </div>
          <div className={`${className}__header__sort__ratings`}>
            <button className={`${className}__header__sort__ratings__asc`} id={`${id}__header__sort__ratings__asc`} type="button" onClick={() => changeFilter(`${id}__header__sort__ratings__asc`)}>
              rating
              <div className={`${className}__header__sort__ratings__ascArrow`} />
            </button>
            <button className={`${className}__header__sort__ratings__desc`} id={`${id}__header__sort__ratings__desc`} type="button" onClick={() => changeFilter(`${id}__header__sort__ratings__desc`)}>
              rating
              <div className={`${className}__header__sort__ratings__descArrow`} />
            </button>
          </div>
          <button className={`${className}__header__sort__arrow`} id={`${id}__header__sort__arrow`} type="button" onClick={() => dropDown()}> </button>
        </div>
      </div>
      <div className={`${className}__list`} id={`${id}__list`}>
        <ItemList items={items} View={LargeItem} count={6} />
      </div>
      <div className={`${className}__pagination`}>
        <Pagination />
      </div>
    </div>
  );
};

Items.propTypes = {
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  className: propTypes.string,
  id: propTypes.string,
};

Items.defaultProps = {
  items: null,
  className: 'items',
  id: 'items',
};

export default Items;
