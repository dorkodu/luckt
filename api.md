# API Reference

## Luckt.store

```js
import Luckt from 'luckt.js';

const store = Luckt.store({ ...options });
```

### Options

#### state

-   type: `Object`

    The root state object for the Luckt store.

#### acts

-   type: `{ [type: string]: Function }`

    Register acts on the store. The handler function always receives `state` as the first argument and receives a second `payload` argument if there is one.

#### getters

-   type: `{ [key: string]: Function }`

    Register getters on the store. The getter function receives the following arguments:

    ```text
    state,     // will be module local state if defined in a module.
    getters    // same as store.getters
    ```

    Registered getters are exposed on `store.getters`.

### Instance Properties

#### state

-   type: `Object`

    The state. Read only.

#### getters

-   type: `Object`

    Exposes registered getters. Read only.

### Instance Methods

#### commit

-   `commit(type: string, payload?: Object, options?: Object)`

Commit an act.

#### replaceState

-   `replaceState(state: Object)`

Replace the store's state. Use this only for state hydration purposes.

#### watch

-   `watch(handler: Function, options?: Object): Function`

Watch the acts. The `handler` is called after every act and receives the act descriptor and post-act state as arguments.

```js
const unwatch = store.watch((act, state) => {
  console.log(act.type);
  console.log(act.payload);
});

// you may call unwatch to stop watching
unwatch();
```

The `watch` method will return an `unwatch` function, which should be called when is no longer need to watch.

By default, new handler is added to the end of the chain, so it will be executed after other handlers that were added before. This can be overridden by adding `prepend: true` to `options`, which will add the handler to the beginning of the chain.

Also, if you want to watch only a specific act (lets assume *increment*), this can be done by adding `act: "increment"` to `options`.

```js
store.watch(handler, { act: "increment" });
```

