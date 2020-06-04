import { configureStore } from '@reduxjs/toolkit';
import reducer from './bugs';

//create store is another example of a higher order function because it takes in a function as an argument.

export default function () {
	return configureStore({ reducer });
}