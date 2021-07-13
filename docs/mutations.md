# Mutations

The only way to actually change state in a Luckt store is by committing a mutation. Luckt mutations are very similar to events: each mutation has a string **type** and a **handler**. The handler function is where we perform actual state modifications, and it will receive the state as the first argument:

```js
const store = new Luckt.store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // mutate state
      state.count++
    }
  }
});
```

You cannot directly call a mutation handler. Think of it more like event registration: "When a mutation with type `increment` is triggered, call this handler." To invoke a mutation handler, you need to call `store.commit` with its type:

```js
store.commit('increment');
```

## Commit with Payload

You can pass an additional argument to `store.commit`, which is called the **payload** for the mutation:

```js
// ...
mutations: {
  increment (state, x) {
    state.count += x;
  }
}
```

```js
store.commit('increment', 10);
```

In most cases, the payload should be an object so that it can contain multiple fields, and the recorded mutation will also be more descriptive:

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount;
  }
}
```

```js
store.commit('increment', {
  amount: 10
});
```

## Using Constants for Mutation Types

It is a commonly seen pattern to use constants for mutation types in various Flux (the Lucid architecture is heavily inspired by Flux) implementations. This allows the code to take advantage of tooling like linters, and putting all constants in a single file allows your collaborators to get an at-a-glance view of what mutations are possible in the entire application:

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Luckt from 'Luckt'
import { SOME_MUTATION } from './mutation-types'

const store = new Luckt.store({
  state: { ... },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

Whether to use constants is largely a preference - it can be helpful in large projects with many developers, but it's totally optional if you don't like them.

## Mutations Must Be Synchronous

One important rule to remember is that **mutation handler functions must be synchronous**.

## On to Actions

Asynchronicity combined with state mutation can make your program very hard to reason about. For example, when you call two methods both with async callbacks that mutate the state, how do you know when they are called and which callback was called first? This is exactly why we want to separate the two concepts. In Luckt, **mutations are synchronous transactions**:

```js
store.commit('increment')
// any state change that the "increment" mutation may cause
// should be done at this moment.
```

To handle asynchronous operations, let's introduce [Actions](actions.md).
