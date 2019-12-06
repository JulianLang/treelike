import { treeOf } from '../../src/core/tree-of';

describe('treeOf', () => {
  it('should recognize objects', () => {
    // arrange
    const subObject = {};
    const propertyName = 'obj';
    const obj: any = {};
    obj[propertyName] = subObject;

    // act, assert
    testTreeOfFn(propertyName, subObject, 'object');
  });

  it('should recognize arrays', () => {
    // arrange
    const subArray: any[] = [];
    const propertyName = 'array';

    // act, assert
    testTreeOfFn(propertyName, subArray, 'array');
  });

  it('should recognize values', () => {
    // arrange
    const aString = 'Hello World';
    const aNumber = 12;
    const aBool = true;
    const propertyName = 'val';

    // act, assert
    const expectedType = 'value';
    testTreeOfFn(propertyName, aString, expectedType);
    testTreeOfFn(propertyName, aNumber, expectedType);
    testTreeOfFn(propertyName, aBool, expectedType);
  });

  it('should handle "level1"-recursions', () => {
    // arrange
    const level1Recursion: any = {};
    level1Recursion.a = level1Recursion;

    // assert, part 1
    expect(() => treeOf(level1Recursion)).not.toThrow();

    // act, part 2
    const result = treeOf(level1Recursion);

    // assert, part 2
    expect(result.children[0].isRecursionRoot).toBe(true);
    expect(result.children[0].value).toBe(level1Recursion);
    expect(result.value).toBe(level1Recursion);
  });

  fit('should handle "level2"-recursions', () => {
    // arrange
    const level2Recursion: any = {
      a: {
        b: true,
      },
    };
    level2Recursion.a.c = level2Recursion;

    // assert, part 1
    expect(() => treeOf(level2Recursion)).not.toThrow();

    // act, part 2

    const result = treeOf(level2Recursion);

    // assert, part 2
    expect(result.children[0].children[1].isRecursionRoot).toBe(true);
    expect(result.children[0].children[1].value).toBe(level2Recursion);
    expect(result.value).toBe(level2Recursion);
  });
});

function testTreeOfFn(propertyName: string, value: any, type: string) {
  const obj: any = {};
  obj[propertyName] = value;

  // act
  const node = treeOf(obj);

  // assert
  expect(node.children.length).toBe(1);

  const subObjNode = node.children[0];
  expect(subObjNode.name).toBe(propertyName);
  expect(subObjNode.value).toBe(value);
  expect(subObjNode.type).toBe(type);
}
