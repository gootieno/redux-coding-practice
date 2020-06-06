import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import errors from './middleware/errors';
//create store is another example of a higher order function because it takes in a function as an argument.

export default function () {
	return configureStore({
		reducer,
		middleware: [
			...getDefaultMiddleware(),
			logger({ destination: 'console' }),
			errors,
		],
	});
}
