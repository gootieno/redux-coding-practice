import store from './store';
import { bugAdded } from './actions';
import { bugResolved } from './actions';

// Store does not have a method to set the state but only to get the state. The way we can set the state is by
// Calling and action like below. The method to do this is store.dispatch() passing in the action you would like to dispatch

// All we want to do here is add the type and description because our render method takes care of adding the other properties to
// the object.

const unsubscribe = store.subscribe(() => {
	// The subscribe method returns a function for unsubscribing from the store. So we may store it in a variable.
	console.log('Store changed!', store.getState()); //Any UI component that may not be visible we should unsubscribe from the store.
});

// In order to add things to the store we must use the dispatch method and dispatch and action.
store.dispatch(bugAdded('Bug 1'));
store.dispatch(bugResolved(1));
// Our bug removed action only requires us to pass the id of the bug so it can filter a new result which resolves in sending back
// the state of objects excluding the id associated with the bug.

unsubscribe(); //Here we unsubscribe from the store because we will  be removing a bug from the UI component.
store.dispatch({
	type: actions.BUG_REMOVED,
	payload: {
		id: 1,
	},
});
console.log(store.getState());
