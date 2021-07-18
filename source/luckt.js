export const Luckt = {
  store: store
};

/**
 * @typedef Store
 * @property {any} state
 * @property {commit} commit  
 * @property {promise} promise  
 * @property {Object<string, getter} getters  
 * @property {watch} watch  
 */

/**
 * @typedef Context
 * @property {commit} commit
 */

/**
 * @typedef ActDescriptor
 * @property {string} name
 * @property {any} payload
 */

/**
 * @callback act
 * @param {any} state
 * @param {any} payload
 */

/**
 * @callback future
 * @param {Context} context
 * @param {any} payload
 */

/**
 * @callback commit
 * @param {string} act
 * @param {any} payload
 */

/**
 * @callback promise
 * @param {string} future
 * @param {any} payload
 */

/**
 * @callback getter
 * @param {any} state
 * @param {Object<string, getter} getters
 */

/**
 * @callback watch
 * @param {(act: ActDescriptor, state: any) => void} handler 
 * @param {{prepend?: boolean, act?: string}} [options] 
 * @returns {unwatch} 
 */

/** 
 * @callback unwatch
 */

/**
 * 
 * @param {object} props 
 * @param {any} props.state
 * @param {Object<string, act} [props.acts]
 * @param {Object<string, future} [props.futures]
 * @param {Object<string, getter} [props.getters]
 * @returns {Store}
 */
function store(props) {
  const state = props.state;
  const acts = props.acts;
  const futures = props.futures;
  const getters = props.getters;
  const localWatches = {};   // Watchs a specific type of act
  const globalWatches = [];  // Watchs every act

  const store = {};
  store.state = state;
  store.commit = commit.bind({ state: state, acts: acts, localWatches: localWatches, globalWatches: globalWatches });
  store.promise = promise.bind({ commit: store.commit, futures: futures })
  store.getters = {};
  store.watch = watch.bind({ localWatches: localWatches, globalWatches: globalWatches });

  for (const key in getters)
    Object.defineProperty(store.getters, key, {
      get: () => getters[key](state, getters)
    });

  return store;
}

/** @type {commit} commit */
function commit(act, payload) {
  this.acts[act](this.state, payload);

  for (let i = 0; i < this.globalWatches.length; ++i)
    this.globalWatches[i]({ type: act, payload: payload }, this.state);
  if (this.localWatches[act])
    for (let i = 0; i < this.localWatches[act].length; ++i)
      this.localWatches[act][i]({ type: act, payload: payload }, this.state);
}

/** @type {promise} promise */
function promise(future, payload) {
  this.futures[future]({ commit: this.commit }, payload);
}


/** @type {watch} watch */
function watch(handler, options) {
  if (options && options.act) {
    // Initialize local watch with act name if not initialized
    if (!this.localWatches[options.act]) this.localWatches[options.act] = [];

    if (!options.prepend) this.localWatches[options.act].unshift(handler);
    else this.localWatches[options.act].push(handler);

    return () => {
      const index = this.localWatches[options.act].indexOf(handler);
      if (index !== -1) this.localWatches[options.act].splice(index, 1);
    };
  }
  else {
    if (options && !options.prepend) this.globalWatches.unshift(handler);
    else this.globalWatches.push(handler);

    return () => {
      const index = this.globalWatches.indexOf(handler);
      if (index !== -1) this.globalWatches.splice(index, 1);
    };
  }
}