import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import Pagination from '../../../components/Pagination';

describe('Pagination tests', () => {
  test('Pagination renders', () => {
    const component = render(<Pagination id="test" />);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('pagination');

    expect(component.getByText('next')).toBeVisible();
    expect(component.getByText('previous')).toBeVisible();
    expect(component.getByText('previous')).toBeDisabled();
  });
  test('Pagination works', async () => {
    const prev = jest.fn();
    const next = jest.fn();
    const component = render(<Pagination id="test" next={next} prev={prev} />);

    const nextBtn = component.getByText('next');
    const prevBtn = component.getByText('previous');

    prevBtn.removeAttribute('disabled');

    await userEvent.click(nextBtn);
    await userEvent.click(prevBtn);

    expect(prev.mock.calls).toHaveLength(1);
    expect(next.mock.calls).toHaveLength(1);
  });
});
