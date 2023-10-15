import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import LargeReview from '../../../components/LargeReview';

describe('LargeReview tests', () => {
  test('LargeReview renders', () => {
    const component = render(<LargeReview id={2} rating={4.2} body="this is a test body" title="test title" date="2022-12-02" item={2} />);
    addStyling(component);

    const container = component.container.querySelector('#largeReview__2');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('largeReview');

    const item = component.getByText('item');
    const title = component.getByText('test title');
    const date = component.getByText('2022-12-02');

    expect(component.getByText('this is a test body')).toBeVisible();
    expect(component.getByText('4.2')).toBeVisible();
    expect(title).not.toBeNull();
    expect(title).not.toBeVisible();
    expect(date).not.toBeNull();
    expect(date).not.toBeVisible();
    expect(item).not.toBeNull();
    expect(item).not.toBeVisible();
    expect(component.getAllByRole('button')).toHaveLength(1);
  });
  test('LargeReview toggles', async () => {
    const component = render(<LargeReview id={1} rating={4.2} body="this is a test body" title="test title" date="2022-12-02" item={2} />);
    addStyling(component);

    const container = component.container.querySelector('#largeReview__1');
    const item = component.getByText('item');
    const title = component.getByText('test title');
    const date = component.getByText('2022-12-02');

    expect(title).not.toBeNull();
    expect(title).not.toBeVisible();
    expect(date).not.toBeNull();
    expect(date).not.toBeVisible();
    expect(item).not.toBeNull();
    expect(item).not.toBeVisible();
    expect(item).toHaveAttribute('href', '/item/2');

    const openBtn = component.getByRole('button');
    await userEvent.click(openBtn);

    expect(title).toBeVisible();
    expect(date).toBeVisible();
    expect(item).toBeVisible();
    expect(container).toHaveStyle('flex-grow: 2.4');

    const closeBtn = component.getByRole('button');
    await userEvent.click(closeBtn);

    expect(title).not.toBeVisible();
    expect(date).not.toBeVisible();
    expect(item).not.toBeVisible();
    expect(container).toHaveStyle('flex-grow: 1');
  });
});
