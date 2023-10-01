import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { items } from '../../mockData/items.json';
import ItemList from '../../../components/ItemList';
import SmallItem from '../../../components/SmallItem';
import LargeItem from '../../../components/LargeItem';

describe('itemList tests', () => {
  const views = [
    SmallItem,
    LargeItem,
  ];
  test.each(views)('list works', (item) => {
    const component = render(
      <BrowserRouter>
        <ItemList items={items} View={item} id="test" />
      </BrowserRouter>,
    );

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('itemList');

    expect(container.children).toHaveLength(2);
  });
});
