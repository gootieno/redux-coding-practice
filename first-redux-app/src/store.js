import { createStore } from 'redux';
import reducer from './reducer';

//create store is another example of a higher order function because it takes in a function as an argument.
const store = createStore(reducer);

export default store;
