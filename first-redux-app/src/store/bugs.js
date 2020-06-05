// Action Types

import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;
const slice = createSlice({
	name: 'bugs',
	initialState: [],
	reducers: {
		//actions => action handlers
		bugAdded: (state, action) => {
			state.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			});
		},
		bugRemoved: (state, action) => {
			return state.filter((bug) => bug.id !== action.payload.id);
		},
		bugResolved: (state, action) => {
			const index = state.findIndex((bug) => bug.id === action.payload.id);
			state[index].resolved = true;
		},
	},
});

export const { bugAdded, bugResolved, bugRemoved } = slice.actions;
export default slice.reducer;
