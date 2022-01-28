interface StoreOptions {
  state: any,
  actions?: { [key: string]: any },
  futures?: { [key: string]: any }
}

interface Listener {
  listeners: { id: number, cb: (() => void) }[],
  queue: { id: number, cb: (() => void) }[],
  busy: boolean,
  id: number
}

class Luckt {
  store(options: StoreOptions) {
    function listener(): Listener {
      return {
        listeners: [],
        queue: [],
        busy: false,
        id: 0
      }
    }

    let _lookAct = {} as any;
    let _lookPromise = {} as any;

    function act(action: string, payload?: any) {
      const parsed = action.split(".");
      const target = parsed[0];
      const event = parsed[1];
      const result = (options as any).actions[target][event]((options as any).actions[target].__(options.state), payload);

      if (!result) return;

      _lookAct[target].busy = true;
      for (let i = 0; i < _lookAct[target].listeners.length; ++i) {
        if (_lookAct[target].listeners[i]) _lookAct[target].listeners[i].cb();
      }
      _lookAct[target].listeners = [];
      _lookAct[target].busy = false;
      for (let i = 0; i < _lookAct[target].queue.length; ++i) {
        if (_lookAct[target].queue[i]) {
          _lookAct[target].listeners.push({
            id: _lookAct[target].queue[i].id,
            cb: _lookAct[target].queue[i].cb
          });
        };
      }
      _lookAct[target].queue = [];
    }

    function promise(future: string, payload?: any) {

    }

    function lookAct(target: string, cb: () => any) {
      if (!_lookAct[target]) _lookAct[target] = listener();

      const id = _lookAct[target].id++;
      let state = (options as any).actions[target].__(options.state);
      let unlook = () => {
        if (_lookAct.busy) {

        }
        else {

        }
      };

      if (_lookAct[target].busy) {
        _lookAct[target].queue.push({ id, cb });
      }
      else {
        _lookAct[target].listeners.push({ id, cb });
      }

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