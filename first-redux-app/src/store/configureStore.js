import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducer from './bugs ';

//create store is another example of a higher order function because it takes in a function as an argument.

export default function configureStore() {
	const store = createStore(reducer, devToolsEnhancer({ trace: true }));
}
