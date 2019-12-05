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

  fit('should handle recursion', () => {
    // arrange
    const obj: any = {};
    obj.a = obj;

    // assert, part 1
    expect(() => treeOf(obj)).not.toThrow();

    // act, part 2
    const result = treeOf(obj);

    // assert, part 2
    expect(result.children[0]).toBe(result);
    expect(result.children[0].isRecursionRoot).toBe(true);
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
