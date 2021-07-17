export const Luckt = {
  store: store
};

/**
 * @typedef Context
 * @property {commit} commit
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
 * 
 * @param {object} props 
 * @param {any} props.state
 * @param {Object<string, act} [props.acts]
 * @param {Object<string, future} [props.futures]
 * @param {Object<string, getter} [props.getters]
 */
function store(props) {
  const state = props.state;
  const acts = props.acts;
  const futures = props.futures;
  const getters = props.getters;

  const store = {};
  store.commit = commit.bind({ state: state, acts: acts });
  store.promise = promise.bind({ commit: store.commit, futures: futures })
  store.getters = {};
  store.state = state;

  for (const key in getters)
    Object.defineProperty(store.getters, key, {
      get: () => getters[key](state, getters)
    });

  return store;
}

/** @type {commit} commit */
function commit(act, payload) {
  this.acts[act](this.state, payload);
}

/** @type {promise} promise */
function promise(future, payload) {
  this.futures[future]({ commit: this.commit }, payload);
}

function watch() {

}