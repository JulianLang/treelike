# Treelike

`treelike` is a small set of functions that helps you converting a JS object into tree structure.

**For example:**

![concept behind treelike](https://github.com/JulianLang/treelike/blob/master/docs/object-as-tree.jpg?raw=true)

## Quick Example

> More details on the functions used in the Quick Example can be found in the section **Available Functions**.

```ts
import {
  treeOf,
  traverse,
  parentTraverser
  TraverseCallbackFn,
} from 'treelike';

const myObject = {
  a: 1,
  b: 'a string',
  c: false,
  d: {
    aa: 123,
    bb: 'another string',
  },
  e: [{}, 2, true],
};

// creates a tree of myObject and returns the root node
const rootNode = treeOf(myObject);

// traverses the tree (starting from the node given, rootNode in this example)
// and calls the callback function for each node being traversed:
traverse(rootNode, (node: ObjectTreeNode) => console.log(node.name));

// you can also change the traversing strategy, e.g. traverse bottom up:
traverse(rootNode, (node: ObjectTreeNode) => console.log(node.name), parentTraverser);
```

## Available Functions

### treeOf

`treeOf(value: any, childSelector?: SelectorFn, parent?: ObjectTreeNode): ObjectTreeNode`

Converts a value into a tree like structure and returns the root node of the created tree.

| Parameter     | Type             | Description                                                                                                                        |
| :------------ | :--------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| value         | `any`            | The value to convert into a treelike structure.                                                                                    |
| childSelector | `SelectorFn`     | (Optional) A function recursively receiving and filtering the value's child-values (such as properties, or items of child-arrays). |
| parent        | `ObjectTreeNode` | (Optional) An `ObjectTreeNode` to be used as parent for the tree (tree concatenation).                                             |
| **returns**   | `ObjectTreeNode` | The `ObjectTreeNode` representing the value passed in.                                                                             |

**Example**

```ts
const obj = { a: 1, b: false, c: [{}, 'str'] };
const rootNode = treeOf(obj);
```

---

### toValue

`toValue(node: ObjectTreeNode, selectChild?: SelectorFn<ObjectTreeNode>): any`

The `toValue` function is the opposite of `treeOf`, as it converts a treelike structure back into the value it represents.

| Parameter     | Type             | Description                                                                       |
| :------------ | :--------------- | :-------------------------------------------------------------------------------- |
| node          | `ObjectTreeNode` | The node to convert back into the value it represents.                            |
| childSelector | `SelectorFn`     | (Optional) A function recursively receiving and filtering the node's child-nodes. |
| **returns**   | `any`            | The value that the original `ObjectTreeNode` formerly represented.                |

**Example**

```ts
const obj = { a: 1, b: false, c: [{}, 'str'] };

const rootNode = treeOf(obj);
const value = toValue(rootNode);
// => { a: 1, b: false, c: [{}, 'str'] }
```

---

### traverse

`traverse(startNode: ObjectTreeNode, callback: TraverseCallbackFn, strategy?: TraverserFn): void`

Traverses the tree from the given startNode and calls the callback function for each node being traversed. You can also set the traverse strategy, which can be either one of the built-in strategies or a custom one:

| Parameter | Type                 | Description                                                                                          |
| :-------- | :------------------- | :--------------------------------------------------------------------------------------------------- |
| startNode | `ObjectTreeNode`     | The node to begin traversion on.                                                                     |
| callback  | `TraverseCallbackFn` | A callback function receiving each `ObjectTreeNode` being traversed.                                 |
| strategy  | `TraverserFn`        | (Optional) A function receiving an `ObjectTreeNode` and returning another based ont the given input. |

#### Built-in TraverseStrategies

- `treeTraverser`: runs down from the given _startNode_ from top to down and left to right (used by default):

  ```
          ((1)) StartNode
          /   \
        (2)   (3)
       /   \     \
     (4)   (5)   (9)
    /     /   \
  (6)   (7)   (8)

  (n): tree-node, where the number indicates the order in which they are passed to the callback function.
  ```

- `childTraverser`: recursively iterates over all children first, then recursing over these children the same way:

  ```
          ((9)) StartNode
          /   \
        (1)   (2)
       /   \     \
     (3)   (4)   (8)
    /     /   \
  (5)   (5)   (7)

  (n): tree-node, where the number indicates the order in which they are passed to the callback function.
  ```

- `parentTraverser`: recursively iterates over all parents of the _startNode_ and their siblings:

  ```
                      (5)
                     /   \
                   (3)   (4)
                  /   \     \
                (1)   (2)   (x)
               /     /   \
  StartNode ((x))  (x)   (x)

  (n): tree-node, where the number indicates the order in which they are passed to the callback function.
  (x): tree-node, not being passed to callback functon.
  ```

- `siblingTraverser`: iterates over all **siblings** of the _startNode_, but not the _startNode_ itself:

  ```
                 ( x )
                /  |  \
  StartNode ((x)) (1)  (2)
                 /   \   \
               (x)   (x)  (x)

  (n): tree-node, where the number indicates the order in which they are passed to the callback function.
  (x): tree-node, not being passed to callback functon.
  ```

  Also it does not iterate over any children of the siblings.

- `siblingAndSelfTraverser`: iterates over all siblings of the _startingNode_ including the _startingNode_ itself:

  ```
                 ( x )
                /  |  \
  StartNode ((1)) (2)  (3)
                 /   \   \
               (x)   (x)  (x)

  (n): tree-node, where the number indicates the order in which they are passed to the callback function.
  (x): tree-node, not being passed to callback functon.
  ```

- `siblingWithChildrenTraverser`: iterates over all siblings of the _startNode_, but not the _startNode_ itself. Also recursively finds and iterates all children of the siblings (level by level):

  ```
                 ( x )
                /  |  \
  StartNode ((x)) (1)  (2)
                 /   \   \
               (3)   (4)  (5)

  (n): tree-node, where the number indicates the order in which they are passed to the callback function.
  (x): tree-node, not being passed to callback functon.
  ```

- `siblingAndSelfWithChildrenTraverser`: iterates over all siblings of the _startNode_ including the _startNode_ itself. Also recursively finds and iterates all children of the siblings and the _startNode_ (level by level):

  ```
                 ( x )
                /  |  \
  StartNode ((1)) (2)  (3)
                 /   \   \
               (4)   (5)  (6)
              /   \        |
            (7)   (8)     (9)

  (n): tree-node, where the number indicates the order in which they are passed to the callback function.
  (x): tree-node, not being passed to callback functon.
  ```

**Example Usage of a Built-in TraverseStrategy**

```ts
import { treeOf, traverse, childTraverser } from 'treelike';

const rootNode = treeOf(someObj);
// third parameter of traverse is the strategy, here we use childTraverser:
traverse(rootNode, node => console.log(node), childTraverser);
```

#### Write your Custom TraverseStrategy

```ts
import { treeOf, traverse, ObjectTreeNode, TraverserCallbackFn } from 'treelike';

// node will be the startNode, use it as entry point to traverse.
function myCustomTraverser(node: ObjectTreeNode, onNext: TraverserCallbackFn): void {
  if (node !== undefined) {
    // send next node to user:
    onNext(node);
  }

  // recursively climb up the parents:
  if (node.parent !== undefined) {
    myCustomTraverser(node.parent, onNext);
  }
}

// then use it:
const rootNode = treeOf(someObj);
traverse(rootNode, node => console.log(node), myCustomTraverser);
```

> **Info:** While the traversers _should never_ have any side effects on the tree, the given onNext-callback argument _can_ manupulate the tree nodes.

---

### findNode

`findNode(root: ObjectTreeNode, condition: ConditionFn, strategy = treeTraverser): ObjectTreeNode | undefined`

Tries to find a node within the given tree-`root`, that satisfies the condition specified by a `ConditionFn`. Additionally accepts a `TraverserFn`, defining how to traverse the given tree. It returns the first match being found.

| Parameter   | Type                            | Description                                                               |
| :---------- | :------------------------------ | :------------------------------------------------------------------------ |
| root        | `ObjectTreeNode`                | A root-node representing the tree to find the specified node on.          |
| condition   | `ConditionFn`                   | The function deciding which `ObjectTreeNode` matches the search criteria. |
| strategy    | `TraverserFn`.                  | (Optional) The strategy to use for traversing the given tree.             |
| **returns** | `ObjectTreeNode` \| `undefined` | The first `ObjectTreeNode` matching the search criteria.                  |

**Example**

```ts
const tree = treeOf({
  a: true,
  b: 42,
  c: ['str', null],
});

const nodeA = findNode(tree, node => node.name === 'a');
// => finds node for property "a"
const nodeB = findNode(tree, node => node.value === 42);
// => finds node for property "b"

const nodeSecondItem = findNode(tree, node => {
  // index 1 = second item of an array
  const isSecondItem = node.name === 1;
  const isChildOfC = node.parent && node.parent.name === 'c';

  return isChildOfC && isSecondItem;
}); // => finds node for property "c[1]"
```

---

### findNodes

`findNodes(root: ObjectTreeNode, condition: ConditionFn, strategy = treeTraverser): ObjectTreeNode[]`

Tries to find nodes within the given tree-`root`, that satisfy the condition specified by a `ConditionFn`. Additionally accepts a `TraverserFn`, defining how to traverse the given tree. It returns all matches being found.

| Parameter   | Type               | Description                                                              |
| :---------- | :----------------- | :----------------------------------------------------------------------- |
| root        | `ObjectTreeNode`   | A root-node representing the tree to find the specified nodes on.        |
| condition   | `ConditionFn`      | The function deciding which `ObjectTreeNode`s match the search criteria. |
| strategy    | `TraverserFn`.     | (Optional) The strategy to use for traversing the given tree.            |
| **returns** | `ObjectTreeNode[]` | All `ObjectTreeNode`s matching the search criteria.                      |

**Example**

```ts
const tree = treeOf({
  a: true,
  b: 42,
  c: ['str', null],
});

const nodeSecondItem = findNode(tree, node => {
  const isNumber = typeof node.value === 'number';
  // index 1 = second item of an array
  const isSecondItem = node.name === 1;

  return isNumber || isSecondItem;
}); // => finds node for  "b" and "c[1]"
```

---

### createNode

`createNode(name: string, value: any, children?: ObjectTreeNode[], parent?: ObjectTreeNode): ObjectTreeNode`

Creates a new `ObjectTreeNode` with the specified properties. When using this method the `type`-property on the created node gets autmatically inferred from the `value`-argument that was passed in.

| Parameter   | Type             | Description                                                                                        |
| :---------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| name        | `string`         | The name describing the property name of the node when passed to `toValue`.                        |
| value       | `any`            | The value that the node represents.                                                                |
| children    | `ObjectTreeNode` | (Optional) The children (representing items or properties) the node should have. Defaults to `[]`. |
| parent      | `ObjectTreeNode` | (Optional) The parent of the node. Defaults to `undefined`.                                        |
| **returns** | `ObjectTreeNode` | A new `ObjectTreeNode` instance having your custom properties.                                     |

#### About the `type` property

The `type`-property reflects the type of the node's `value`. Valid values for the `type`-property are: `'object'`, `'array'` and `'value'`.

---

**Please Note:** When manually changing the `value` of a node, the `type`-property **does not** get automatically updated. You can use the `nodeTypeOf` function for this.

**Example: `nodeTypeOf`**

```ts
const obj = {
  a: [],
  b: {},
  c: 1,
  d: true,
  e: 'str',
  f: () => {},
};

const root = treeOf(obj);

nodeTypeOf(findNode(root, n => n.name === 'a')); // 'array'
nodeTypeOf(findNode(root, n => n.name === 'b')); // 'object'
nodeTypeOf(findNode(root, n => n.name === 'c')); // 'value'
nodeTypeOf(findNode(root, n => n.name === 'd')); // 'value'
nodeTypeOf(findNode(root, n => n.name === 'e')); // 'value'
nodeTypeOf(findNode(root, n => n.name === 'f')); // 'value'
```

---

### nodeTypeOf

`nodeTypeOf(value: any): ObjectTreeNodeType`

Returns the `ObjectTreeNodeType` for the specified value.

---

### addChild

`addChild(node: ObjectTreeNode, toNode: ObjectTreeNode): void`

Adds the specified node to the children of the _toNode_ argument and updates the nodes' `parent` and `child` properties.

| Parameter | Type             | Description                             |
| :-------- | :--------------- | :-------------------------------------- |
| node      | `ObjectTreeNode` | The `ObjectTreeNode` to add as a child. |
| toNode    | `ObjectTreeNode` | The node that should receive the child. |

**Example**

```ts
const parent: ObjectTreeNode = createNode('parentName', []);
const newChild: ObjectTreeNode = createNode('childName', {});

addChild(newChild, parent);
// this will add 'newChild' to 'parent.children', and set 'parent' as 'newChild.parent'
```

---

### addChildren

`addChildren(nodes: ObjectTreeNode[], toNode: ObjectTreeNode): void`

Adds the specified array of nodes to the node specified as _toNode_ argument and updates the nodes' `parent` and `child` properties.

| Parameter | Type               | Description                                |
| :-------- | :----------------- | :----------------------------------------- |
| nodes     | `ObjectTreeNode[]` | The `ObjectTreeNode` to add as a children. |
| toNode    | `ObjectTreeNode`   | The node that should receive the child.    |

**Example**

```ts
const parent: ObjectTreeNode = createNode('parentName', []);
const child1: ObjectTreeNode = createNode('child1', {});
const child2: ObjectTreeNode = createNode('child2', {});

const childCollection = [child1, child2];
addChildren(childCollection, parent);
// this will add 'child1' and 'child2' to 'parent.children', and set 'parent' on both of these child nodes to the 'parent' node
```

---

### addNewChild

`addNewChild(toNode: ObjectTreeNode, name: string, value: any, children?: ObjectTreeNode[]): void`

Creates a new node and adds it as a child to the specified _toNode_ argument. Meant as a shortcut for a combination of `createNode` and `addNode`, like this:

| Parameter | Type               | Description                                                                                                            |
| :-------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------- |
| toNode    | `ObjectTreeNode`   | The `ObjectTreeNode` to add as a children.                                                                             |
| name      | `string`           | The name of the node to create. The name represents the node's item-index or property-name when processed by `toValue` |
| value     | `string`           | The value of the node.                                                                                                 |
| children  | `ObjectTreeNode[]` | (Optional) The node's children representing items or properties of the node's value.                                   |

**Example**

```ts
// more explicit way:
const parent = createNode('parentName', null);
const child = createNode('childName', null);
addChild(child, parent);

// shortcut with 'addNewChild'
const parent = createNode('parentName', null);
addNewChild(parent, 'childName', null);
```

---

### remove

`remove(node: ObjectTreeNode, parent?: ObjectTreeNode): number`

Removes the specified node from the children array of a given node and returns the former index of the removed node. If the _parent_-argument is not set, its defaults to the `parent`-property of the given _node_-argument.

> **Please Note:** the method will not throw if the node is not found in the parent-node's children array. Instead the index `-1` is returned and nothing gets changed on the children array of the parent.

| Parameter | Type             | Description                                                                   |
| :-------- | :--------------- | :---------------------------------------------------------------------------- |
| node      | `ObjectTreeNode` | The `ObjectTreeNode` to remove from children.                                 |
| parent    | `ObjectTreeNode` | (Optional) The parent node to remove the node from. Defaults to `node.parent` |

---

### replace

`replace(node: ObjectTreeNode, withNode: ObjectTreeNode, onNode?: ObjectTreeNode): void`

Replaces the specified node with another node in the children array of the **onNode**-argument. If the _onNode_-argument is undefined, its value defaults to the `parent`-property of the _node_-argument.

| Parameter | Type             | Description                                                                |
| :-------- | :--------------- | :------------------------------------------------------------------------- |
| node      | `ObjectTreeNode` | The `ObjectTreeNode` to remove from children.                              |
| withNode  | `ObjectTreeNode` | The `ObjectTreeNode` to add in place to the children.                      |
| onNode    | `ObjectTreeNode` | (Optional) The node containing the given `node`. Defaults to `node.parent` |

**Example**

```ts
const parent = createNode('parentName', null);
const child1 = createNode('child1', null);
addChild(child1, parent);

// now replace child1 with child2
const child2 = createNode('child2', null);
replace(child1, child2, parent);

// or: shorter way, since we know that child1.parent === parent, we can omit the third argument:
replace(child1, child2);
```

## Types and Interfaces

### `ObjectTreeNodeType`

Defines possible types of `ObjectTreeNode`s. The type gets deduced by the type of an `ObjectTreeNode`'s value.

`type ObjectTreeNodeType = 'object' | 'array' | 'value';`

> **Important:** When changing the `value` of an `ObjectTreeNode`, the `type`-property does not automatically get updated.
> This is a responsibility of the value-changing code.

---

### `ObjectTreeNode<T>`

The interface describing a node as produced by `treeOf` function.

```ts
interface ObjectTreeNode<T = any> {
  parent?: ObjectTreeNode<any>;
  name: string | number;
  type: ObjectTreeNodeType;
  children: ObjectTreeNode<any>[];
  isRecursionRoot: boolean;
  value: T;
}
```

| Property        | Type                  | Description                                                                                        |
| :-------------- | :-------------------- | :------------------------------------------------------------------------------------------------- |
| name            | `string` \| `number`  | The name of the node. Represents an item index or property name, based on the `node.type`-property |
| value           | `T` defaults to `any` | The value that the node represents.                                                                |
| type            | `ObjectTreeNodeType`  | The node's `ObjectTreeNodeType`. It reflects the type of `node.value`.                             |
| parent          | `ObjectTreeNode`      | The node's parent node. If `undefined`, the node is the root node of a tree.                       |
| children        | `ObjectTreeNode[]`    | The node's child nodes.                                                                            |
| isRecursionRoot | `boolean`             | Whether the node is the root-node of a recursive (sub)-tree.                                       |

---

### `TraverserFn`

A function that receives an `ObjectTreeNode`, traverses it and calls a `TraverseCallbackFn´ for each traversed node.

`type TraverserFn = (node: ObjectTreeNode, onNext: TraverseCallbackFn) => void`

---

### `TraverseCallbackFn`

A callback function that receives every node being traversed.

`type TraverseCallbackFn = (node: ObjectTreeNode) => void`

---

### `SelectorFn<T>`

A function that receives an input (of type `any` for `treeOf` and `ObjectTreeNode` for `toValue`) and computes values that should be used as children (in node context).

`type SelectorFn<T = any> = (input: T) => T`

---

### `ConditionFn`

A function that receives an input of type `ObjectTreeNode` and computes a boolean value from it. It represents a condition that is based ont a `ObjectTreeNode`.

`type ConditionFn = (node: ObjectTreeNode) => boolean`
