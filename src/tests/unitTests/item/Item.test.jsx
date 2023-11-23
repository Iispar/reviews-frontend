/* eslint-disable import/named */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor, act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { getItem } from '../../../services/pagesService';
import { deleteItem } from '../../../services/itemService';
import { itemSuccess, itemNoTopWords } from '../../mockData/Item.json';
import Item from '../../../pages/item/Item';
import { findWithSpan } from '../../testHelpers';
import { UseGetReviews, UseNewReview } from '../../../pages/item/itemHooks';
import parseInputFile from '../../../helpers/ParseInputFile';

jest.mock('../../../pages/item/ItemChart');
jest.mock('../../../pages/item/NewReviewForm');
jest.mock('../../../pages/item/Reviews');
jest.mock('../../../pages/item/Title');
jest.mock('../../../pages/item/Words');
jest.mock('../../../components/ActionWait');
jest.mock('../../../helpers/ParseInputFile');

Object.defineProperty(window, 'location', {
  configurable: true,
  value: { reload: jest.fn() },
});

const useNewReviewMock = jest.fn();
const useGetReviewsMock = jest.fn();
jest.mock('../../../pages/item/itemHooks', () => ({
  UseNewReview: jest.fn(),
  UseGetReviews: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();
// mocks the useNavigate() function.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const getItemMockWithNextSuccess = () => Promise.resolve(itemSuccess);
jest.mock('../../../services/pagesService', () => ({
  getItem: jest.fn(),
}));

jest.mock('../../../services/itemService', () => ({
  deleteItem: jest.fn(),
}));

beforeEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
  getItem.mockImplementation(getItemMockWithNextSuccess);

  UseNewReview.mockImplementation((itemId, accountId, list, token, reloadReviews, setLoading) => {
    useNewReviewMock(itemId, accountId, list, token);
    reloadReviews();
    setLoading(0);
  });
  UseGetReviews.mockImplementation((
    itemId,
    search,
    page,
    sort,
    sortDir,
    token,
    setReviews,
    setIsNextPage,
    setLoading,
  ) => {
    if (page === 2) {
      useGetReviewsMock(itemId, search, page, sort, sortDir, token);
      setReviews(itemNoTopWords.reviews.responseList);
      setIsNextPage(false);
      setLoading(0);
    } else {
      useGetReviewsMock(itemId, search, page, sort, sortDir, token);
      setReviews(itemNoTopWords.reviews.responseList);
      setIsNextPage(true);
      setLoading(0);
    }
  });
});

describe('item tests', () => {
  describe('renders tests', () => {
    test('Item renders with next page and all components', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('item');
        expect(component.getByText('Test item title'));
      });
      expect(component.getByText((content, node) => findWithSpan(node, '151reviews'))).toBeVisible();
      expect(component.getByText('hover')).toBeVisible();
      expect(component.getByText('4.3rating')).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '124positive'))).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '15negative'))).toBeVisible();

      expect(component.getByText('Reviews')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sort1 asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sort1 desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sort2 asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sort2 desc' })).toBeVisible();

      expect(component.getByText(/2015-05-17/)).toBeVisible();
      expect(component.getByText(/Test title/)).toBeVisible();
      expect(component.getByText(/Test body/)).toBeVisible();
      expect(component.getByText(/999/)).toBeVisible();
      expect(component.getByText(/997/)).toBeVisible();

      expect(component.getByText('most common words')).toBeVisible();
      expect(component.getByText('with positive reviews')).toBeVisible();
      expect(component.getByText('with negative reviews')).toBeVisible();
      expect(component.getByText('pos1')).toBeVisible();
      expect(component.getByText('neg1')).toBeVisible();

      expect(component.getByText('add a new comment')).not.toBeVisible();
      expect(component.getByPlaceholderText('title')).not.toBeVisible();
      expect(component.getByPlaceholderText('comment body')).not.toBeVisible();
      expect(component.getByText('or add a file')).not.toBeVisible();
      expect(component.container.querySelector('#dateInput')).not.toBeNull();
      expect(component.container.querySelector('#fileInput')).not.toBeNull();
      expect(component.getByRole('button', { name: 'add', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'new review' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete', hidden: true })).toBeVisible();

      expect(component.getByText('Are you sure?')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'yes', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'no', hidden: true })).not.toBeVisible();

      expect(component.getByText(/888/)).toBeVisible();
      expect(component.getByText(/887/)).toBeVisible();
      expect(component.getByText(/testTime/)).toBeVisible();
      expect(component.getByText(/testYear/)).toBeVisible();
      expect(component.getByRole('button', { name: 'week' })).toBeVisible();
      expect(component.getByRole('button', { name: 'month' })).toBeVisible();
    });
    test('loading (1) renders', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );
      await waitFor(() => {
        expect(component.container.querySelectorAll('#loading__beat')).toHaveLength(7);
      });
    });
  });
  describe('data load states work', () => {
    test('error works', async () => {
      getItem.mockImplementation(() => Promise.resolve([]));
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('error while fetching data, please try again')).toBeVisible();
      });
    });
    test('not top words works', async () => {
      getItem.mockImplementation(() => Promise.resolve(itemNoTopWords));
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('no top pos')).toBeVisible();
        expect(component.getByText('no top neg')).toBeVisible();
      });
    });
    test('nextPage works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'next' })).not.toBeDisabled();
      });
    });
    test('no nextPage works', async () => {
      getItem.mockImplementation(() => Promise.resolve(itemNoTopWords));
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'next' })).toBeDisabled();
      });
    });
  });
  describe('functions work', () => {
    test('words / newReview toggle works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });

      const openForm = component.getByRole('button', { name: 'new review' });
      await userEvent.click(openForm);

      expect(component.getByText('most common words')).not.toBeVisible();
      expect(component.getByText('add a new comment')).toBeVisible();
      expect(openForm).not.toBeVisible();

      const closeBtn = component.getByRole('button', { name: 'close' });

      await userEvent.click(closeBtn);
      expect(component.getByText('most common words')).toBeVisible();
      expect(component.getByText('add a new comment')).not.toBeVisible();
      expect(openForm).toBeVisible();
    });
    test('submit review with input works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      await userEvent.click(component.getByRole('button', { name: 'new review' }));
      const title = component.getByPlaceholderText('title');
      const body = component.getByPlaceholderText('comment body');
      const date = component.container.querySelector('#dateInput');

      await userEvent.type(title, 'test title');
      await userEvent.type(body, 'test body');
      await userEvent.type(date, '2022-01-01');

      expect(title).toHaveValue('test title');
      expect(body).toHaveValue('test body');
      expect(date).toHaveValue('2022-01-01');

      await userEvent.click(component.getByRole('button', { name: 'add' }));

      expect(useNewReviewMock.mock.calls).toHaveLength(1);
      expect(useNewReviewMock.mock.calls[0][2]).toStrictEqual([{ body: 'test body', date: '2022-01-01', title: 'test title' }]);

      expect(useGetReviewsMock.mock.calls).toHaveLength(1);
      expect(useGetReviewsMock.mock.calls[0][2]).toBe(0);
      expect(useGetReviewsMock.mock.calls[0][3]).toBe('none');
      expect(useGetReviewsMock.mock.calls[0][4]).toBe('none');

      expect(component.getByText(/Loaded item/)).toBeVisible();

      expect(title).toHaveValue('');
      expect(body).toHaveValue('');
      expect(date).toHaveValue('');
    });
    test('reload with sort works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      await userEvent.click(component.getByRole('button', { name: 'new review' }));
      await userEvent.click(component.getByRole('button', { name: 'sort1 asc' }));
      const title = component.getByPlaceholderText('title');
      const body = component.getByPlaceholderText('comment body');
      const date = component.container.querySelector('#dateInput');

      await userEvent.type(title, 'test title');
      await userEvent.type(body, 'test body');
      await userEvent.type(date, '2022-01-01');

      expect(title).toHaveValue('test title');
      expect(body).toHaveValue('test body');
      expect(date).toHaveValue('2022-01-01');

      await userEvent.click(component.getByRole('button', { name: 'add' }));

      expect(useGetReviewsMock.mock.calls).toHaveLength(2);
      expect(useGetReviewsMock.mock.calls[1][2]).toBe(0);
      expect(useGetReviewsMock.mock.calls[1][3]).toBe('review_sort1');
      expect(useGetReviewsMock.mock.calls[1][4]).toBe('asc');

      expect(component.getByText(/Loaded item/)).toBeVisible();

      expect(title).toHaveValue('');
      expect(body).toHaveValue('');
      expect(date).toHaveValue('');
    });
    test('submit review with file works', async () => {
      parseInputFile.mockImplementation(() => ([{ body: 'test body', date: '2022-01-01', title: 'test title' }]));
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      await userEvent.click(component.getByRole('button', { name: 'new review' }));
      const fileInput = component.container.querySelector('#fileInput');
      const file = new File([''], 'filename.json', { type: 'text/html' });
      await userEvent.upload(fileInput, file);

      await userEvent.click(component.getByRole('button', { name: 'add' }));

      expect(useNewReviewMock.mock.calls).toHaveLength(1);
      expect(useNewReviewMock.mock.calls[0][2]).toStrictEqual([{ body: 'test body', date: '2022-01-01', title: 'test title' }]);
    });
    test('delete review works', async () => {
      deleteItem.mockImplementation(() => Promise.resolve());
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });

      const deleteBtn = component.getByRole('button', { name: 'delete' });

      await user.click(deleteBtn);

      expect(deleteBtn).not.toBeVisible();

      const confirm = component.getByRole('button', { name: 'yes' });
      expect(confirm).toBeVisible();

      await user.click(confirm);

      await waitFor(() => {
        expect(component.getByText('success')).toBeVisible();
      });

      act(() => { jest.advanceTimersByTime(1200); });

      expect(component.container.querySelector('#itemActionWait__container')).toBeNull();
      expect(mockedUsedNavigate.mock.calls).toHaveLength(1);
      expect(mockedUsedNavigate.mock.calls[0][0]).toBe('/all');
    });
    test('delete review error works', async () => {
      deleteItem.mockImplementation(() => Promise.reject());
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });

      const deleteBtn = component.getByRole('button', { name: 'delete' });

      await user.click(deleteBtn);

      expect(deleteBtn).not.toBeVisible();

      const confirm = component.getByRole('button', { name: 'yes' });
      expect(confirm).toBeVisible();

      await user.click(confirm);

      await waitFor(() => {
        expect(component.getByText('fail')).toBeVisible();
      });

      act(() => { jest.advanceTimersByTime(3200); });

      expect(component.container.querySelector('#itemActionWait__container')).toBeNull();
      expect(mockedUsedNavigate.mock.calls).toHaveLength(0);
    });
    test('cancel delete works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });

      const deleteBtn = component.getByRole('button', { name: 'delete' });

      await userEvent.click(deleteBtn);

      expect(deleteBtn).not.toBeVisible();

      const cancel = component.getByRole('button', { name: 'no' });
      expect(cancel).toBeVisible();

      await userEvent.click(cancel);

      expect(deleteBtn).toBeVisible();
      expect(cancel).not.toBeVisible();
    });
    test('pagination works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });

      const nextBtn = component.getByRole('button', { name: 'next' });
      const prevBtn = component.getByRole('button', { name: 'previous' });

      expect(nextBtn).not.toBeDisabled();
      await userEvent.click(nextBtn);
      await userEvent.click(nextBtn);

      expect(useGetReviewsMock.mock.calls).toHaveLength(2);
      expect(useGetReviewsMock.mock.calls[1][2]).toBe(2);
      expect(nextBtn).toBeDisabled();

      await userEvent.click(prevBtn);
      await userEvent.click(prevBtn);

      expect(useGetReviewsMock.mock.calls).toHaveLength(4);
      expect(useGetReviewsMock.mock.calls[3][2]).toBe(0);
      expect(prevBtn).toBeDisabled();
      expect(nextBtn).not.toBeDisabled();
    });
    test('pagination works with sort', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      await userEvent.click(component.getByRole('button', { name: 'sort1 asc' }));

      const nextBtn = component.getByRole('button', { name: 'next' });
      const prevBtn = component.getByRole('button', { name: 'previous' });

      expect(nextBtn).not.toBeDisabled();
      await userEvent.click(nextBtn);

      expect(useGetReviewsMock.mock.calls).toHaveLength(2);
      expect(useGetReviewsMock.mock.calls[1][2]).toBe(1);
      expect(useGetReviewsMock.mock.calls[1][3]).toBe('review_sort1');

      await userEvent.click(prevBtn);
      expect(useGetReviewsMock.mock.calls).toHaveLength(3);
      expect(useGetReviewsMock.mock.calls[2][2]).toBe(0);
      expect(useGetReviewsMock.mock.calls[2][3]).toBe('review_sort1');
      expect(prevBtn).toBeDisabled();
      expect(nextBtn).not.toBeDisabled();
    });
    test('search works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      const search = component.getByPlaceholderText('Search');
      await userEvent.type(search, 'test search{enter}');

      expect(useGetReviewsMock.mock.calls).toHaveLength(1);
      expect(useGetReviewsMock.mock.calls[0][1]).toBe('test search');
    });
    test('search with sort works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      const sort = component.getByRole('button', { name: 'sort1 asc' });
      await userEvent.click(sort);

      expect(useGetReviewsMock.mock.calls).toHaveLength(1);
      expect(useGetReviewsMock.mock.calls[0][3]).toBe('review_sort1');
      expect(useGetReviewsMock.mock.calls[0][4]).toBe('asc');

      const search = component.getByPlaceholderText('Search');
      await userEvent.type(search, 'test search{enter}');

      expect(useGetReviewsMock.mock.calls).toHaveLength(2);
      expect(useGetReviewsMock.mock.calls[1][1]).toBe('test search');
      expect(useGetReviewsMock.mock.calls[1][3]).toBe('review_sort1');
      expect(useGetReviewsMock.mock.calls[1][4]).toBe('asc');
    });
    const sorts = [
      'sort1 asc',
      'sort1 desc',
      'sort2 asc',
      'sort2 desc',
    ];
    test.each(sorts)('sort works', async (sort) => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });

      const btn = component.getByRole('button', { name: sort });
      await userEvent.click(btn);

      expect(useGetReviewsMock.mock.calls).toHaveLength(1);
      expect(useGetReviewsMock.mock.calls[0][3]).toBe(`review_${sort.split(' ')[0]}`);
      expect(useGetReviewsMock.mock.calls[0][4]).toBe(sort.split(' ')[1]);
    });
    test('clear search works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      const search = component.getByPlaceholderText('Search');
      await userEvent.type(search, 'test search');
      expect(search).toHaveValue('test search');
      await userEvent.click(component.getByRole('button', { name: 'clear' }));

      expect(useGetReviewsMock.mock.calls[0][1]).toBe('');
    });
    test('clear search with sort works', async () => {
      const component = render(
        <BrowserRouter>
          <Item id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText('Test item title'));
      });
      await userEvent.click(component.getByRole('button', { name: 'sort1 asc' }));
      const search = component.getByPlaceholderText('Search');
      await userEvent.type(search, 'test search');
      expect(search).toHaveValue('test search');
      await userEvent.click(component.getByRole('button', { name: 'clear' }));

      expect(useGetReviewsMock.mock.calls[1][1]).toBe('');
      expect(useGetReviewsMock.mock.calls[1][3]).toBe('review_sort1');
    });
  });
});
