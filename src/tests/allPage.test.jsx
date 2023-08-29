import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllItems from '../pages/allItems/AllItems';
import Items from '../pages/allItems/Items';

describe('all items site works fully', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('test');
    jest.mock('axios');
  });
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
        <Items visible />
      </BrowserRouter>,
    ).container;

    const search = pageContainer.querySelector('#searchField__input');
    const itemList = pageContainer.querySelector('.items');
    const pagination = pageContainer.querySelector('#pagination');

    expect(search).toBeTruthy();
    expect(itemList).toBeTruthy();
    expect(pagination).toBeTruthy();
  });
});
