import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Footer from '../../../components/Footer';

describe('footer tests', () => {
  test('footer renders', () => {
    const component = render(<Footer id="test" />);
    const container = component.container.querySelector('#test');

    expect(container).toBeVisible();
    expect(container.className).toBe('footer');
    expect(component.getByText('about this website')).toBeVisible();
    expect(component.getByText('this application is my personal project. It mocks a online shops site for sellers. There is a lot more information about the site and how it works on github, please refer it if you would like to know more.')).toBeVisible();
    expect(component.getByText('iiro.s.partanen@gmail.com')).toBeVisible();
    expect(component.getByText('iispar@github.com')).toBeVisible();
  });
});
