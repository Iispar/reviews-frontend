/* eslint-disable import/named */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor,
} from '@testing-library/react';
import Home from '../../../pages/home/Home';
import { getHome } from '../../../services/pagesService';
import { homeWithNextPage } from '../../mockData/Home.json';

jest.mock('../../../pages/home/HomeChart');
jest.mock('../../../pages/home/HomeStats');
jest.mock('../../../pages/home/LatestReviews');
jest.mock('../../../pages/home/MostPopular');

const getHomeMock = () => Promise.resolve(homeWithNextPage);
jest.mock('../../../services/pagesService', () => ({
  getHome: jest.fn(),
}));

beforeEach(() => {
  getHome.mockImplementation(getHomeMock);
  window.localStorage.setItem('token', 'logged user');
  window.localStorage.setItem('accountId', '2');
});

describe('home tests', () => {
  describe('render tests', () => {
    test('succesful render works', async () => {
      const component = render(<Home id="test" />);

      await waitFor(() => {
        expect(component.getByText('1212'));
      });
    });
  });
});
