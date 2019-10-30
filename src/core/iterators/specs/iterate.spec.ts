import * as IterateArrayFn from '../array.iterator';
import { iterate } from '../iterate';
import * as IterateObjFn from '../object.iterator';

describe('iterate', () => {
  it('should call iterateObject when an object is given', () => {
    // arrange
    const obj = {};
    spyOn(IterateObjFn, 'iterateObject');

    // act
    iterate(obj, () => {});

    // assert
    expect(IterateObjFn.iterateObject).toHaveBeenCalledTimes(1);
  });

  it('should call iterateArray when an array is given', () => {
    // arrange
    const array: any[] = [];
    spyOn(IterateArrayFn, 'iterateArray');

    // act
    iterate(array, () => {});

    // assert
    expect(IterateArrayFn.iterateArray).toHaveBeenCalledTimes(1);
  });
});
