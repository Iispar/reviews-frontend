import { React, useState } from 'react';
import $ from 'jquery';
import Pagination from '../../components/Pagination';
import ItemList from '../../components/ItemList';
import LargeItem from '../../components/LargeItem';
import dummyItems from '../../data/dummyItems.json';
import SearchField from '../../components/SearchField';

const Items = () => {
  const { items } = dummyItems;
  const [open, setOpen] = useState(false);

  /**
   * Sets the hover to a button.
   * @param {*} id
   * @param {*} color
   */
  const hover = (id, color) => {
    $(id).hover(
      () => {
        $(id).css('background-color', color);
      },
      () => {
        $(id).css('background-color', 'transparent');
      },
    );
  };

  /**
   * Animates and opens the dropdown menu for the sort.
   */
  const dropDown = () => {
    // we use jquery hover and not css, because we need to disable when clicked.
    // this doesn't seem that good so will look into a better solution in the future.
    hover('#items__header__sort__reviews__desc', '#f5f5f5');
    hover('#items__header__sort__reviews__asc', '#f5f5f5');
    hover('#items__header__sort__ratings__desc', '#f5f5f5');
    hover('#items__header__sort__ratings__asc', '#f5f5f5');
    if (open) {
      $('#items__header__sort').animate({
        width: '44px',
        height: '20px',
        'margin-top': '0px',
      }, 200);
      $('#items__header__sort__reviews__desc').css('display', 'none');
      $('#items__header__sort__reviews__asc').css('display', 'none');
      $('#items__header__sort__ratings__desc').css('display', 'none');
      $('#items__header__sort__ratings__asc').css('display', 'none');
      $('#items__header__sort__btn').css('display', 'flex');
      $('#items__header__sort__arrow').css('transform', 'rotate(0deg)');
      setOpen(false);
    } else {
      $('#items__header__sort').animate({
        width: '120px',
        height: '32px',
        'margin-top': '12px',
        'padding-left': '0px',
      }, 200);
      $('#items__header__sort__reviews__desc').css('display', 'flex');
      $('#items__header__sort__reviews__asc').css('display', 'flex');
      $('#items__header__sort__ratings__desc').css('display', 'flex');
      $('#items__header__sort__ratings__asc').css('display', 'flex');
      $('#items__header__sort__btn').css('display', 'none');
      $('#items__header__sort__arrow').css('transform', 'rotate(180deg)');
      setOpen(true);
    }
  };

  /**
   * Changes the filter and sets it to displayed.
   * @param {*} sort
   */
  const changeFilter = (sort) => {
    const type = sort.split('__')[3];
    let width;
    if (type === 'reviews') width = '70px';
    else width = '60px';
    $('#items__header__sort').animate({
      width,
      height: '20px',
      'margin-top': '0px',
    }, 200);

    $('#items__header__sort__reviews__desc').css('display', 'none');
    $('#items__header__sort__reviews__asc').css('display', 'none');
    $('#items__header__sort__ratings__desc').css('display', 'none');
    $('#items__header__sort__ratings__asc').css('display', 'none');
    // why doesn't addClass work?=
    $(`#${sort}`).css({
      display: 'flex',
      'padding-top': '2px',
    });
    hover(`#${sort}`, 'transparent');
    $('#items__header__sort__arrow').css('transform', 'rotate(0deg)');
    setOpen(false);
  };

  return (
    <div className="items">
      <div className="items__header">
        <div className="items__header__search">
          <SearchField placeholder="Search" />
        </div>
        <div className="items__header__sort" id="items__header__sort">
          <button className="items__header__sort__btn" id="items__header__sort__btn" type="button" onClick={() => dropDown()}>
            sort
            <div className="items__header__sort__btn__arrow" id="items__header__sort__btn__arrow" />
          </button>
          <div className="items__header__sort__reviews">
            <button className="items__header__sort__reviews__asc" id="items__header__sort__reviews__asc" type="button" onClick={() => changeFilter('items__header__sort__reviews__asc')}>
              reviews
              <div className="items__header__sort__reviews__ascArrow" />
            </button>
            <button className="items__header__sort__reviews__desc" id="items__header__sort__reviews__desc" type="button" onClick={() => changeFilter('items__header__sort__reviews__desc')}>
              reviews
              <div className="items__header__sort__reviews__descArrow" />
            </button>
          </div>
          <div className="items__header__sort__ratings">
            <button className="items__header__sort__ratings__asc" id="items__header__sort__ratings__asc" type="button" onClick={() => changeFilter('items__header__sort__ratings__asc')}>
              rating
              <div className="items__header__sort__ratings__ascArrow" />
            </button>
            <button className="items__header__sort__ratings__desc" id="items__header__sort__ratings__desc" type="button" onClick={() => changeFilter('items__header__sort__ratings__desc')}>
              rating
              <div className="items__header__sort__ratings__descArrow" />
            </button>
          </div>
          <button className="items__header__sort__arrow" id="items__header__sort__arrow" type="button" onClick={() => dropDown()}> </button>
        </div>
      </div>
      <div className="items__list">
        <ItemList items={items} View={LargeItem} count={6} />
      </div>
      <div className="items__pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default Items;
