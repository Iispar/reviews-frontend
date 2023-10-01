import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LayoutsWithNav from '../../../components/LayoutsWithNav';

describe('LayoutsWithNav tests', () => {
  test('LayoutsWithNav renders', () => {
    const component = render(
      <BrowserRouter>
        <LayoutsWithNav />
      </BrowserRouter>,
    );
    const container = component.container.querySelector('#layout');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('layout');
    expect(container.children).toHaveLength(3);
  });
});
