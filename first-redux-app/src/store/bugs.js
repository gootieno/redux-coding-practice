// Action Types
import { createAction } from '@reduxjs/toolkit';

//Action Creators
export const bugAdded = createAction('bugAdded');
export const bugResolved = createAction('bugResolved');
export const bugRemoved = createAction('bugRemoved');

let lastId = 0;

export default function reducer(state = [], action) {
	//We need to set the state as an empty array otherwise the state will be initialized as undefined
	switch (action.type) {
		case bugAdded:
			return [
				...state,
				{
					id: ++lastId,
					description: action.payload.description,
					resolved: false,
				},
			];
		case bugResolved:
			return state.map((bug) =>
				bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
			);
		case bugRemoved:
			return state.filter((bug) => bug.id !== action.payload.id);

		default:
			return state;
	}
}
