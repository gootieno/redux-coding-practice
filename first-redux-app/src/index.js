import store from './store';

// Store does not have a method to set the state but only to get the state. The way we can set the state is by
// Calling and action like below. The method to do this is store.dispatch() passing in the action you would like to dispatch

// All we want to do here is add the type and description because our render method takes care of adding the other properties to
// the object.


store.subscribe(() => {
	console.log('Store changed!', store.getState());
});

store.dispatch({
	type: 'bugAdded',
	payload: {
		description: 'bug one',
	},
});

// Our bug removed action only requires us to pass the id of the bug so it can filter a new result which resolves in sending back
// the state of objects excluding the id associated with the bug.
store.dispatch({
	type: 'bugRemoved',
	payload: {
		id: 1,
	},
});
console.log(store.getState());
