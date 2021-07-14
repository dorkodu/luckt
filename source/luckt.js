export const Luckt = {
  store: store
};

/**
 * 
 * @param {object} props 
 * @param {object} props.state
 * @param {object} [props.acts]
 * @param {object} [props.futures]
 */
function store(props) {
  const state = props.state;
  const acts = props.acts;
  const futures = props.futures;

  const store = {};
  store.commit = commit.bind({ state: state, acts: acts });
  store.promise = promise.bind({ commit: store.commit, futures: futures })

  Object.defineProperty(store, "state", {
    get: () => Object.assign({}, state)
  })

  return store;
}

function commit(act) {
  this.acts[act](this.state);
}

function promise(future) {
  this.futures[future]({ commit: this.commit });
}