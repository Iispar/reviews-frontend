import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AllItems from '../pages/allItems/AllItems';
import FileInput from '../pages/allItems/FileInput';
import Items from '../pages/allItems/Items';

describe('all items site works fully', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
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
    const header = pageContainer.querySelector('#allItems__grid__header');
    const title = pageContainer.querySelector('#allItems__grid__title');
    const items = pageContainer.querySelector('#allItems__grid__items');
    const fileInput = pageContainer.querySelector('#allItems__grid__fileInput');
    const footer = pageContainer.querySelector('#allItems__grid__footer');

    expect(header).toBeTruthy();
    expect(title).toBeTruthy();
    expect(items).toBeTruthy();
    expect(fileInput).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  /**
   * Renders the file input component for allitems and checks it renders
   */
  test('file input renders', () => {
    const pageContainer = render(
      <BrowserRouter>
        <FileInput visible />
      </BrowserRouter>,
    ).container;
    const title = pageContainer.querySelector('#fileInput__title');
    const form = pageContainer.querySelector('#fileInput__form');
    const fileInput = pageContainer.querySelector('#fileInput__form__file');
    const submit = pageContainer.querySelector('#fileInput__form__submitBtn');

    expect(title).toBeTruthy();
    expect(form).toBeTruthy();
    expect(fileInput).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  /**
   * FileInput works with the mock.
   */
  test('file input works', async () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());
    const pageContainer = render(
      <BrowserRouter>
        <FileInput visible onSubmit={mockSubmit} />
      </BrowserRouter>,
    ).container;

    // not testing file input yet...
    const name = pageContainer.querySelector('#fileName__container__input');
    const desc = pageContainer.querySelector('#fileDesc__container__input');

    await userEvent.type(name, 'testName');
    await userEvent.type(desc, 'this is the test description');

    expect(name).toHaveValue('testName');
    expect(desc).toHaveValue('this is the test description');

    const submitBtn = pageContainer.querySelector('#fileInput__form__submitBtn');
    await user.click(submitBtn);

    expect(mockSubmit).toBeCalledTimes(1);
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
