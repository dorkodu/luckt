interface StoreOptions {
  state: any,
  actions?: { [key: string]: any },
  futures?: { [key: string]: any }
}

interface Listener {
  listeners: { [key: string]: (() => void)[] },
  queue: (() => void)[],
  busy: boolean
}

class Luckt {
  store(options: StoreOptions) {
    function listener(): Listener {
      return {
        listeners: {},
        queue: [],
        busy: false
      }
    }

    let _lookAct = listener();
    let _lookPromise = listener();

    function act(action: string, payload?: any) {
      const parsed = action.split(".");
      const target = parsed[0];
      const event = parsed[1];
      const result = (options as any).actions[target][event]((options as any).actions[target].__(options.state), payload);

      if (!result) return;

      _lookAct.busy = true;
      for (let i = 0; i < _lookAct.listeners[target].length; ++i) {
        if (_lookAct.listeners[target]) _lookAct.listeners[target][i]();
      }
      _lookAct.listeners[target] = [];
      _lookAct.busy = false;
      for (let i = 0; i < _lookAct.queue.length; ++i) {
        if (_lookAct.queue[i]) _lookAct.queue[i]()
      }
      _lookAct.queue = [];
    }

    function promise(future: string, payload?: any) {

    }

    function lookAct(target: string, cb: () => any) {

      let state = (options as any).actions[target].__(options.state);
      let unlook;

      if (_lookAct.busy) {
        _lookAct.queue.push(cb);
        unlook = () => { _lookAct.listeners[target].splice(_lookAct.listeners[target].indexOf(cb), 1) }
        return [state, unlook];
      };

      if (!_lookAct.listeners[target]) _lookAct.listeners[target] = [];
      _lookAct.listeners[target].push(cb);
      unlook = () => { _lookAct.listeners[target].splice(_lookAct.listeners[target].indexOf(cb), 1) }

      return [state, unlook];
    }

    function lookPromise(future: string, cb: () => any) {

    }

    return {
      state: options.state,
      act,
      promise,
      lookAct,
      lookPromise
    }
  }
}

export const luckt = new Luckt();