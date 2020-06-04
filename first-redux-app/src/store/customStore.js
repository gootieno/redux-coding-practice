/*Here we create a create store function from scratch using private properties. In order  to 
create private properties in js we must create another function within the initial function. 
This makes modifying the state variable impossible from outside sources we then return a plain 
object with the name of the function inside the initial function as a method to that object.
NOTE: we don't envoke this function inside the object.*/

// import reducer from './reducer';
// import * as actions from 'actions';

// function createStore(reducer) {
// 	let state;
// 	function getState() {
// 		return state;
//     }

// 	function subscribers(listener) {
// 		listeners.push(listener);
// 	}
// 	function dispatch(action) {
// 		//call reducer to get new state, then notify subscribers.
// 		state = reducer(state, action);
// 	}

// 	return {
// 		getState,
// 		dispatch,
// 	};
// }
