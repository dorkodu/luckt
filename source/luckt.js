export const Luckt = {
  store: store
};

/**
 * 
 * @param {object} props 
 * @param {object} props.state
 * @param {object} [props.acts]
 * @param {object} [props.futures]
 * @param {object} [props.getters]
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

  Object.defineProperty(store, "state", {
    get: () => Object.assign({}, state)
  });

  Object.keys(getters).forEach((key) => {
    Object.defineProperty(store.getters, key, {
      get: () => getters[key](Object.assign({}, state), getters)
    });
  });

  return store;
}

function commit(act, ...args) {
  this.acts[act](this.state, ...args);
}

function promise(future) {
  this.futures[future]({ commit: this.commit });
}