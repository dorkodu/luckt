export const Luckt = {
  store: store
};

/**
 * 
 * @param {object} props 
 * @param {object} props.state
 * @param {object} [props.mutations]
 * @param {object} [props.actions]
 */
function store(props) {
  const state = props.state;
  const mutations = props.mutations;
  const actions = props.actions;

  const store = {};
  store.commit = commit.bind({ state: state, mutations: mutations });
  store.dispatch = dispatch.bind({ commit: store.commit, actions: actions })

  Object.defineProperty(store, "state", {
    get: () => Object.assign({}, state)
  })

  return store;
}

function commit(mutation) {
  this.mutations[mutation](this.state);
}

function dispatch(action) {
  this.actions[action]({ commit: this.commit });
}