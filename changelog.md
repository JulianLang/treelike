v0.0.21

- refactor: make object tree node interfaces generic to allow extended nodes to be passed in.
- fix: `nodeTypeOf` will now return 'value' for `null` or `undefined` as input.
- refactor: toValue will not reevaluate each node's type but trust on node-data to be correct.
- (chore: remove unused dependency)
