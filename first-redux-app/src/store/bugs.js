// Action Types
import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
//Action Creators
export const bugAdded = createAction('bugAdded');
export const bugResolved = createAction('bugResolved');
export const bugRemoved = createAction('bugRemoved');

let lastId = 0;

export default createReducer([], {
	//key: value
	//actions: functions(event => event handler)
	[bugAdded.type]: (bugs, action) => {
		bugs.push({
			id: ++lastId,
			description: action.payload.description,
			resolved: false,
		});
	},

	[bugResolved.type]: (bugs, action) => {
		const index = bugs.findIndex((bug) => bug.id === action.payload.id);
		bugs[index].resolved = true;
	},

	[bugRemoved.type]: (bugs, action) => {
		return bugs.filter((bug) => bug.id !== action.payload.id);
	},
});

// export default function reducer(state = [], action) {
// 	//We need to set the state as an empty array otherwise the state will be initialized as undefined
// 	switch (action.type) {
// 		case bugAdded.type:
// 			return [...state, ,];
// 		case bugResolved.type:
// 			return state.map((bug) =>
// 				bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
// 			);
// 		case bugRemoved.type:
// 			return state.filter((bug) => bug.id !== action.payload.id);

// 		default:
// 			return state;
// 	}
// }
