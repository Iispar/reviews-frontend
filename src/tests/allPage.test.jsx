import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllItems from '../pages/allItems/AllItems';
import Items from '../pages/allItems/Items';
import dummyItems from '../data/dummyData/dummyItems.json';

describe('all items site works fully', () => {
  /**
   * Renders the allITems page and checks that every component exists there.
   */
  test('page renders with components', () => {
    const pageContainer = render(
      <BrowserRouter>
        <AllItems visible />
      </BrowserRouter>,
    ).container;
    const title = pageContainer.querySelector('#allItems__grid__title');
    const items = pageContainer.querySelector('#allItems__grid__items');
    const fileInput = pageContainer.querySelector('#allItems__grid__fileInput');

    expect(title).toBeTruthy();
    expect(items).toBeTruthy();
    expect(fileInput).toBeTruthy();
  });

  /**
   * The items list render correctly.
   */
  test('items render correctly', async () => {
    const pageContainer = render(
      <BrowserRouter>
        <Items items={dummyItems.items} visible />
      </BrowserRouter>,
    ).container;

    const search = pageContainer.querySelector('#searchField__input');
    const sortBtn = pageContainer.querySelector('#items__header__sort__btn');
    const sortRevAsc = pageContainer.querySelector('#items__header__sort__reviews__asc');
    const sortRevDesc = pageContainer.querySelector('#items__header__sort__reviews__desc');
    const sortRatAsc = pageContainer.querySelector('#items__header__sort__ratings__asc');
    const sortRatDesc = pageContainer.querySelector('#items__header__sort__ratings__desc');
    const itemList = pageContainer.querySelector('#itemList');
    const pagination = pageContainer.querySelector('#pagination');

    expect(search).toBeTruthy();
    expect(sortBtn).toBeTruthy();
    expect(sortRevAsc).toBeTruthy();
    expect(sortRevDesc).toBeTruthy();
    expect(sortRatAsc).toBeTruthy();
    expect(sortRatDesc).toBeTruthy();
    expect(itemList).toBeTruthy();
    expect(pagination).toBeTruthy();
  });
});
