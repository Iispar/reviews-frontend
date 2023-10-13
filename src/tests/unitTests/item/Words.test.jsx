import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Words from '../../../pages/item/Words';
import { itemSuccess } from '../../mockData/Item.json';

jest.mock('../../../components/TopWords.jsx');

describe('Words tests', () => {
  describe('render tests', () => {
    test('succesful render works', () => {
      const component = render(<Words
        id="test"
        posWords={itemSuccess.topPos}
        negWords={itemSuccess.topNeg}
      />);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('words');

      expect(component.getByText('most common words'));
      expect(component.getByText('with positive reviews'));
      expect(component.getByText('with negative reviews'));
      expect(component.getByText('pos2'));
      expect(component.getByText('neg2'));
    });
    test('loading render works', () => {
      const component = render(<Words
        id="test"
        posWords={null}
        negWords={null}
      />);

      expect(component.container.querySelectorAll('#loading__beat')).toHaveLength(3);
    });
    test('no top words render works', () => {
      const component = render(<Words
        id="test"
        posWords={[]}
        negWords={[]}
      />);

      expect(component.getByText('no top pos')).toBeVisible();
      expect(component.getByText('no top neg')).toBeVisible();
    });
  });
});
