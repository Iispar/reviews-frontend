import '@testing-library/jest-dom/extend-expect';
import parseInputFile from '../../../helpers/ParseInputFile';

describe('parseInputFile tests', () => {
  test('parseInputFile works', async () => {
    const file = new File(['{"result":true, "count":42}'], 'filename.json', { type: 'text/html' });
    expect(await parseInputFile(file)).toStrictEqual({ result: true, count: 42 });
  });
});
