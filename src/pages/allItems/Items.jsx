import { React, useState } from 'react';
import $ from 'jquery';
import Pagination from '../../components/Pagination';
import ItemList from '../../components/ItemList';
import LargeItem from '../../components/LargeItem';
import dummyItems from '../../data/dummyItems.json';
import SearchField from '../../components/SearchField';

// eslint-disable-next-line arrow-body-style
const Items = () => {
  const { items } = dummyItems;
  const [open, setOpen] = useState(false);

  const dropDown = () => {
    if (open) {
      $('#items__header__sort').removeClass('expand');
      $('#items__header__sort__text').css('display', 'flex');
      $('#items__header__sort__sorts').css('display', 'none');
      setOpen(false);
    } else {
      $('#items__header__sort').addClass('expand');
      $('#items__header__sort__text').css('display', 'none');
      $('#items__header__sort__sorts').css('display', 'flex');
      setOpen(true);
    }
  };

  return (
    <div className="items">
      <div className="items__header">
        <div className="items__header__search">
          <SearchField />
        </div>
        <div className="items__header__sort" id="items__header__sort">
          <div className="items__header__sort__text" id="items__header__sort__text"> sort </div>
          <div className="items__header__sort__sorts" id="items__header__sort__sorts">
            <span className="items__header__sort__sorts__reviews"> reviews </span>
            <span> rating </span>
            <span> age? </span>
          </div>
          <button className="items__header__sort__arrow" type="button" onClick={() => dropDown()}> </button>
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
