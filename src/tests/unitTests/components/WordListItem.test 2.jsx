import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import WordListItem from '../../../components/WordListItem';

describe('WordListItem tests', () => {
  test('WordListItem renders', () => {
    const component = render(<WordListItem name="test word" index={2} id="test" />);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('wordListItem');

    expect(component.getByText('3.')).toBeVisible();
    expect(component.getByText('test word')).toBeVisible();
  });
});
