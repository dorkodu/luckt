/**
 * Copyright (c) Dorkodu.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const Luckt = {
  createStore: createStore
};

/**
 * Returns a store that's created with given properties.
 */
function createStore(properties) {
  return {
    commit: function(action) {

    },
    follow: function (callback) {
      
    },
    state: function () {
      
    },
    get: function (name) {
      
    },
  };
}

/**
 * TODO: MAKE THIS SIMPLE REDUX CLONE, SOMETHING REASONABLE
 * A simplified clone of Redux : createStore
 *  - Create a store with methods :
 *    1- getState: returns the current state
 *    2- subscribe: add a listener
 *    3- unsubscribe: remove a listener
 *    4- dispatch: takes an action and updates the state
 */

const Redux = {

  createStore(reducer) {

    var state;
    var listeners = [];

    function getState() {
      return state;
    }

    function subscribe(listener) {

      listeners.push(listener);

      return function unsubscribe() {
        // index of listener callback
        let listenerIndex = listeners.indexOf(listener);

        // if listener do exist, remove it from the listeners list
        if (listenerIndex !== -1) {
          listeners.splice(listeners.indexOf(listener), 1);
        }
      };
    }

    function dispatch(action) {

      // generate the new state
      state = reducer(state, action);

      // call listeners
      listeners.forEach(function (listener) {
        listener();
      });

      // dispatch always returns the action
      // this is really important for middleware's
      return action;
    }

    return {
      getState: getState,
      subscribe: subscribe,
      dispatch: dispatch,
    };
  }
}
