# Luckt ~  the Journey Logbook

Notes of the author on Luckt. How it works? Design goals? etc. This won't be an official thing, just to show how the author thinks about principles and the philosophy behind Luckt.

### What?

As we thought a better approach on application architecture, this will take its "state" part, then will show you the very simple ideas.

- ### state

  Each app has a state of business logic and view. Lucid says the business logic state should be managed by a global store. View state is a modularized component state. This will be handled by components itself. You can use a library like Lucid, Vue or React. So a store should be used for storing global app state about business logic. This will keep and manage changes on your app state.

- ### acts

  Lucid says that changes to your application business logic state should be made as **transactions**. You should **not** do this manually, this means exponential increase of complexity as your code grows. So possible **transactions** (changes in your app state) should be defined beforehand, and conducted by a storekeeper.

  Acts are functions that takes only

  

### How?

- You define "**acts**" on your state, describing possible changes/mutations. 
- You define your **initial state.**
- You should be able to get just a section of your state, so you can define "**getters**" for your state.<br>Getters are pure functions that takes the state as a parameter and returns something from it.
- When you want to get notified about the changes that are made, give a follower callback to your store, after each change is made, all these callbacks will be called.
- When you want to manipulate the state, use **commit** by giving it a single action object which MUST has "act" property. You can add more information in it, and use as you wish.

```js
const store = Luckt.createStore({
  state: {
    count: 1
  },
  getters: {
    doubledCount: function(state) {
      return state.count * 2;
    }
  },
  acts: {
    increment: function(state, action) {
      
    },
    setCount: function(state, action) {
      
    }
  }
})

/*
	you can follow changes in your store, by giving callbacks 
	which will be called after changes are made. the follow method 
	will return an unfollow callback which you can run after you 
	no longer need to follow the changes.
 */                                  
const unfollow = store.follow(function() { 
  console.log('state has changed!')
})

// returns the state object.
store.state()

/* 
	calls the doubledCount getter and returns what doubledCount returns 
*/
store.get("doubledCount")

store.commit({ act: "setCount", newCount: 100 })

```

