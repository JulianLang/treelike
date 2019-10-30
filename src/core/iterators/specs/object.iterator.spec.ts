import { iterateObject } from '../object.iterator';

describe('object iterator', () => {
  it('should call the callback the correct number of times', () => {
    // arrange
    const obj: any = {
      a: 1,
      b: true,
      c: {},
    };
    const objLength = Object.keys(obj).length;
    const spyCallback = jasmine.createSpy('callback', () => {});

    // act
    iterateObject(obj, spyCallback);

    // assert
    expect(spyCallback).toHaveBeenCalledTimes(objLength);
  });

  it('should pass in correct args in callback fn', () => {
    // arrange
    const obj1 = {};
    const obj: any = {
      a: 1,
      b: true,
      c: obj1,
    };

    // act
    iterateObject(obj, (value, name) => {
      // assert
      expect(typeof name).toBe('string');
      expect(value).toBe(obj[name]);
    });
  });
});
