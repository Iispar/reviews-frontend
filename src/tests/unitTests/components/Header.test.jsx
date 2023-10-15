import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import Header from '../../../components/Header';

describe('header tests', () => {
  test('header renders', async () => {
    const component = render(<Header id="test" />);
    addStyling(component);
    const container = component.container.querySelector('#test');

    expect(container).toBeVisible();
    expect(container.className).toBe('headerContainer');

    const buttons = component.getAllByRole('button');
    const home = component.getByRole('link', { name: 'home' });
    const all = component.getByRole('link', { name: 'all items' });
    const settings = component.getByRole('link', { name: 'settings' });

    expect(buttons).toHaveLength(2);

    const navBar = component.container.querySelector('#test__navBar');
    expect(navBar).not.toBeNull();
    expect(navBar).toHaveAttribute('class', 'headerContainer__navBar');

    expect(home).toHaveAttribute('href', '/home');
    expect(all).toHaveAttribute('href', '/all');
    expect(settings).toHaveAttribute('href', '/settings');
  });
  test('toggle navBar works', async () => {
    const component = render(<Header id="test" />);
    addStyling(component);

    const hamburgerBtn = component.getAllByRole('button')[0];
    const hamburger = component.container.querySelector('#test__header__hamburger');

    const navBar = component.container.querySelector('#test__navBar');

    expect(navBar).not.toBeNull();

    await userEvent.click(hamburgerBtn);

    expect(navBar).toHaveStyle('transform: scaleX(1)');
    expect(hamburger).toHaveAttribute('class', 'headerContainer__header__hamburger clicked');

    await userEvent.click(hamburgerBtn);

    expect(navBar).toHaveStyle('transform: scaleX(0)');
    expect(hamburger).toHaveAttribute('class', 'headerContainer__header__hamburger');
  });
  test('logout works', async () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });

    window.localStorage.setItem('token', 'testToken');
    window.localStorage.setItem('accountId', 'testId');
    const component = render(<Header id="test" />);

    const logOutBtn = component.getAllByRole('button')[1];

    await userEvent.click(logOutBtn);

    expect(window.localStorage.getItem('token')).toBeNull();
    expect(window.localStorage.getItem('accountId')).toBeNull();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
