import { isDefined } from '../..';

describe('isDefined', () => {
  it('should return false for null and undefined, false otherwise', () => {
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
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);

    expect(isDefined(fn)).toBe(true);
    expect(isDefined(string)).toBe(true);
    expect(isDefined(bool)).toBe(true);
    expect(isDefined(aNumber)).toBe(true);
    expect(isDefined(falsy1)).toBe(true);
    expect(isDefined(falsy2)).toBe(true);
    expect(isDefined(falsy3)).toBe(true);
    expect(isDefined(falsy4)).toBe(true);
    expect(isDefined(falsy5)).toBe(true);
    expect(isDefined(falsy6)).toBe(true);
  });
});
