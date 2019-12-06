import { isUndefined } from '../../src';

describe('isUndefined helper function', () => {
  it('should return true for null and undefined, false otherwise', () => {
    // arrange
    const fn = () => {};
    const string = 'str';
    const bool = false;
    const aNumber = 0;
    const falsy1 = false;
    const falsy2 = 0;
    const falsy3 = NaN;
    const falsy4 = '';
    const falsy5 = '';
    const falsy6 = ``;

    // act
    // assert
    expect(isUndefined(null)).toBe(true);
    expect(isUndefined(undefined)).toBe(true);

    expect(isUndefined(fn)).toBe(false);
    expect(isUndefined(string)).toBe(false);
    expect(isUndefined(bool)).toBe(false);
    expect(isUndefined(aNumber)).toBe(false);
    expect(isUndefined(falsy1)).toBe(false);
    expect(isUndefined(falsy2)).toBe(false);
    expect(isUndefined(falsy3)).toBe(false);
    expect(isUndefined(falsy4)).toBe(false);
    expect(isUndefined(falsy5)).toBe(false);
    expect(isUndefined(falsy6)).toBe(false);
  });
});
