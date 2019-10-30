import { iterateArray } from '../array.iterator';

describe('array iterator', () => {
  it('should call the callback the correct number of times', () => {
    // arrange
    const array = [1, 2, 3, 4];
    const numberOfItems = array.length;
    const spyCallback = jasmine.createSpy('callback', () => {});

    // act
    iterateArray(array, spyCallback);

    // assert
    expect(spyCallback).toHaveBeenCalledTimes(numberOfItems);
  });

  it('should ', () => {
    // arrange
    const array = [1, 2, 3, 4];
    const numberOfItems = array.length;

    // act
    iterateArray(array, (value, index) => {
      // assert
      expect(typeof index).toBe('number');
      expect(value).toBe(array[index as number]);
    });
  });
});
