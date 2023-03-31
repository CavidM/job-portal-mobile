import { selectPickerDataFactory } from './DataTransferFactories';

const inputCase1 = [
  {
    id: 1,
    name: 'baku'
  }
];
const outputCase1 = [{ label: 'baku', value: 1, key: 1 }];

describe('Data transfer factories', () => {
  it(`selectPickerDataFactory([{id: 1, name: "baku"}]) should return ${JSON.stringify(outputCase1)}`, () => {
    const factory = selectPickerDataFactory(inputCase1);

    expect(factory).toEqual(outputCase1);
  });
});
