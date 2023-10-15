import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { useTextWidth, useVerticalPoints } from '../../../helpers/componentHelpers';

describe('componentHelpers tests', () => {
  const widths = [
    ['test text one', 13],
    ['test two', 8],
    ['test number three which is a bit longer', 39],
  ];
  test.each(widths)('useTextWidth works', (text, ans) => {
    expect(useTextWidth(text)).toBe(ans, 'mulish.ttf');
  });
  const verticalPoints = [
    [5, [
      138,
      280,
      422,
      564,
      706,
    ]],
    [7, [
      97.42857142857143,
      198.85714285714286,
      300.2857142857143,
      401.7142857142857,
      503.14285714285717,
      604.5714285714286,
      706,
    ]],
    [9, [
      74.88888888888889,
      153.77777777777777,
      232.66666666666666,
      311.55555555555554,
      390.44444444444446,
      469.33333333333337,
      548.2222222222223,
      627.1111111111112,
      706.0000000000001,
    ]],
  ];
  test.each(verticalPoints)('verticalPoints works', (text, ans) => {
    expect(useVerticalPoints(text)).toStrictEqual(ans);
  });
});
