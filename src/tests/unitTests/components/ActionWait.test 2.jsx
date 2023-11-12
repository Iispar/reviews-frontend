import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ActionWait from '../../../components/ActionWait';

describe('actionWait tests', () => {
  test('loading renders correctly', () => {
    const component = render(<ActionWait loading={4} id="test" />);
    const base = component.container.querySelector('div[id=test]');
    const container = component.container.querySelector('div[id=test__container]');
    const ringLoad = component.container.querySelector('div[id=test__container__ring]');
    const children = component.container.querySelectorAll('div[id=test__container__ring] > div');

    expect(base).toBeVisible();
    expect(base.className).toBe('actionWait');
    expect(container).toBeVisible();
    expect(container.className).toBe('actionWait__container');
    expect(ringLoad).toBeVisible();
    expect(ringLoad.className).toBe('actionWait__container__ring');
    expect(children).toHaveLength(4);
  });
  test('success renders correctly', () => {
    const component = render(<ActionWait loading={5} id="test" />);
    const base = component.container.querySelector('div[id=test]');
    const container = component.container.querySelector('div[id=test__container]');
    const circleContainer = component.container.querySelector('div[id=test__container__success]');
    const circleBorder = component.container.querySelector('div[id=test__container__success__circleBorder]');
    const circle = component.container.querySelector('div[id=test__container__success__circle]');
    const check = component.container.querySelector('div[id=test__container__success__circle__check]');

    expect(base).toBeVisible();
    expect(base.className).toBe('actionWait');
    expect(container).toBeVisible();
    expect(container.className).toBe('actionWait__container');
    expect(circleContainer).toBeVisible();
    expect(circleContainer.className).toBe('actionWait__container__success');
    expect(circleBorder).toBeVisible();
    expect(circleBorder.className).toBe('actionWait__container__success__circleBorder');
    expect(circle).toBeVisible();
    expect(circle.className).toBe('actionWait__container__success__circle');
    expect(check).toBeVisible();
    expect(check.className).toBe('actionWait__container__success__circle__check');
  });
  test('error renders correctly', () => {
    const component = render(<ActionWait loading={6} id="test" />);
    const base = component.container.querySelector('div[id=test]');
    const container = component.container.querySelector('div[id=test__container]');
    const circleContainer = component.container.querySelector('div[id=test__container__error]');
    const circleBorder = component.container.querySelector('div[id=test__container__error__circleBorder]');
    const circle = component.container.querySelector('div[id=test__container__error__circle]');
    const cross = component.container.querySelector('div[id=test__container__error__circle__cross]');
    const message = component.getByText('please try again');

    expect(base).toBeVisible();
    expect(base.className).toBe('actionWait');
    expect(container).toBeVisible();
    expect(container.className).toBe('actionWait__container');
    expect(circleContainer).toBeVisible();
    expect(circleContainer.className).toBe('actionWait__container__error');
    expect(circleBorder).toBeVisible();
    expect(circleBorder.className).toBe('actionWait__container__error__circleBorder');
    expect(circle).toBeVisible();
    expect(circle.className).toBe('actionWait__container__error__circle');
    expect(cross).toBeVisible();
    expect(cross.className).toBe('actionWait__container__error__circle__cross');
    expect(message).toBeVisible();
    expect(message.className).toBe('actionWait__container__errorText');
  });
});
