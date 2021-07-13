# Luckt

At the center of every Luckt application is the store. A "store" is basically a container that holds your application state. There are two things that make a Luckt store different from a plain global object:

1.  Luckt stores are reactive. When state is retrieved from it, retrievers will reactively and efficiently notified if the store's state changes. 

2. You cannot directly mutate the store's state. The only way to change a store's state is by explicitly committing mutations. This ensures every state change leaves a track-able record, and enables tooling that helps us better understand our applications.

## The Simplest Store

>   #### Note
>
>   We will be using ES2015 syntax for code examples for the rest of the docs.

After installing **Luckt**, let's create a *store*. It is pretty straightforward - just provide an initial state object, and some mutations:

```js
import Luckt from 'luckt.js';

const store = new Luckt.store({
  state: {
    count: 0;
  },
  mutations: {
    increment (state) {
      state.count++;
    }
  }
});
```

Now, you can access the state object as `store.state` , and trigger a state change with the `store.commit` method:

```js
store.commit('increment');

console.log(store.state.count);
```

Again, the reason we are committing a mutation instead of changing store.state.count directly, is because we want to explicitly track it. This simple convention makes your intention more explicit, so that you can reason about state changes in your app better when reading the code. In addition, this gives us the opportunity to implement tools that can log every mutation, take state snapshots, or even perform time travel debugging. Using store state in a component simply involves returning the state within a computed property, because the store state is reactive. Triggering changes simply means committing mutations in component methods. Next, we will discuss each core concept in much finer details, starting with State.