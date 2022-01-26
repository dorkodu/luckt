interface StoreOptions {
  state: any,
  actions?: { [key: string]: any },
  futures?: { [key: string]: any }
}

class Luckt {
  store(options: StoreOptions) {
    function listener() {
      return { listener: [], queue: [], busy: false }
    }

    let _lookAct = listener();
    let _lookPromise = listener();
    let _watchAct = listener();
    let _watchPromise = listener();

    function act(action: string, payload?: any) {

    }

    function watch(promise: string, payload?: any) {

    }

    function lookAct(action: string, cb: () => any) {

    }

    function lookPromise(future: string, cb: () => any) {

    }

    function watchAct(action: string, cb: () => any) {

    }

    function watchPromise(future: string, cb: () => any) {

    }

    return {
      state: options.state,
      act,
      watch,
      lookAct,
      lookPromise,
      watchAct,
      watchPromise
    }
  }
}

export const luckt = new Luckt();

/*


function luckt(options) {
  let listeners = {};
  let busy = false;
  let queue = [];

  function act(action, payload) {
    busy = true;

    action = action.split("/");
    const target = action[0];
    const event = action[1];

    options.actions[target][event](options.state);
    for (let i = 0; i < listeners[target].length; ++i) {
      if (listeners[target][i]) listeners[target][i]();
    }
    listeners[target] = []

    busy = false;

    for (let i = 0; i < queue.length; ++i) {
      if (queue[i]) queue[i]();
    }
    queue = [];
  }

  function promise(future, payload) {

  }

  function lookAct(target, cb) {
    let state = options.actions[target].__(options.state);
    let unlook;
    let id;

    if (busy) {
      id = queue.push(() => { lookAct(target, cb) });
      unlook = () => { queue[id - 1] = undefined; }
      return [state, unlook];
    };

    if (!listeners[target]) listeners[target] = [];
    id = listeners[target].push(cb)
    unlook = () => { listeners[target][id - 1] = undefined; }

    return [state, unlook];
  }

  function lookPromise(target, cb) {
    console.log("Looking!");
  }

  function watchAct(target, cb) {
    console.log("Watching!");
  }

  function watchPromise(target, cb) {
    console.log("Watching!");
  }

  return {
    state: options.state,
    act,
    promise,
    lookAct,
    lookPromise,
    watchAct,
    watchPromise,
  };
}

const store = luckt({
  state: { count: 1 },
  actions: {
    counter: {
      __: (state) => state,
      increase: (state) => { state.count++ },
      decrease: (state) => { state.count-- },
      reset: (state) => { state.count = 0 },
    }
  }
});

*/