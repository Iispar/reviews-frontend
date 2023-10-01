import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import TopWords from '../../../components/TopWords';
import { words } from '../../mockData/words.json';

describe('TopWords tests', () => {
  test('topWords renders', () => {
    const component = render(<TopWords words={words} id="test" title="test title" />);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('wordList');

    const list = component.container.querySelector('#test__list');

    expect(component.getByText('test title')).toBeVisible();
    expect(list.children).toHaveLength(5);
  });
});
