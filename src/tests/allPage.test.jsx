import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Items from '../pages/allItems/Items';

describe('all items site works fully', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('test');
    jest.mock('axios');
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
