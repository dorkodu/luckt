export const Luckt = {
  store: Store
};

/**
 * @callback ActFunction
 * @param {any} state
 * @param {any} payload
 */

/**
 * @callback FutureFunction
 * @param {(act: string, payload: any) => void} commit
 * @param {any} payload
 */

/**
 * @callback GetterFunction
 * @param {any} state
 * @param {Object<string, () => any>} getters
 */

/**
 * 
 * @param {object} props 
 * @param {any} props.state Initial state of the store.
 * @param {Object<string, ActFunction>} props.acts 
 * @param {Object<string, FutureFunction>} props.futures
 * @param {Object<string, GetterFunction>} props.getters
 */
function Store(props) {
  this.state = props.state;
  const acts = props.acts;
  const futures = props.futures;
  this.getters = {};
  const watches = {};

  for (const key in props.getters)
    Object.defineProperty(this.getters, key, { get: () => props.getters[key](this.state, this.getters) });

  /**
   * 
   * @param {string} act 
   * @param {any} payload 
   */
  this.commit = (act, payload) => {
    acts[act](this.state, payload);

    if (watches[act])
      for (let i = 0; i < watches[act].length; ++i)
        watches[act][i]();
  }

  /**
   * 
   * @param {string} future 
   * @param {any} payload 
   */
  this.promise = (future, payload) => {
    futures[future](this.commit, payload);
  }

  /**
   * 
   * @param {string} act 
   * @param {() => void} callback 
   * @param {boolean} prepend 
   * @returns 
   */
  this.watch = (act, callback, prepend) => {
    if (!watches[act]) watches[act] = [];

    if (prepend) watches[act].unshift(callback);
    else watches[act].push(callback);

    return () => {
      const index = watches[act].indexOf(callback);
      if (index !== -1) watches[act].splice(index, 1);
    }
  }
}