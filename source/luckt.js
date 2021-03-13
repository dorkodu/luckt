/**
 * Copyright (c) Dorkodu
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root folder of this source tree.
 */

export const Luckt = {
  createStore: createStore
};

/**
 * Returns a store that's created with given properties.
 */
function createStore(properties) {

  let _committing = false;
  
  // assigning the initial state, if given
  let _state = properties.state && isObject(properties.state)
              ? properties.state
              : {}

  let _watchers = [];
  let _getters = properties.getters;
  let _acts = properties.acts;

  function commit(action) {

    // TODO: update the state

    // notice the watchers
    _watchers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (watcher) {
      if(isFunction(watcher))
        watcher(action, _state);
    });

    /**
     * commiting always returns the action
     * this is really important for middleware's
     */ 
    return action;
  }

  function watch(watcher, options) {
    
  }  

  function get(name) {

  }

  function state() {
    /**
     * Will return the "momentary clone" of state, to make sure you can't mutate it directly.
     * I am pretty unexperienced in JS, but just hope this works.
     */
    return Object.assign({}, _state);
  }

  return {
    commit: commit,
    watch: watch,
    state: state,
    get: get
  };
}

function premise(condition, explanation) {
  if (!condition) console.error(`[luckt] ${explanation}`)
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isFunction (val) {
  return obj !== null && typeof obj === 'function'
}

/**
 * forEach for object type
 */
function forEachAttribute (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}