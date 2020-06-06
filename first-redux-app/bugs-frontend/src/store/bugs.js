// Action Types

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;
const slice = createSlice({
	name: 'bugs',
	initialState: {
		list: [],
		loading: true,
		lastFetch: null,
	},
	reducers: {
		//actions => action handlers
		bugAdded: (state, action) => {
			state.list.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			});
		},
		bugRemoved: (state, action) => {
			return state.list.filter((bug) => bug.id !== action.payload.id);
		},
		bugResolved: (state, action) => {
			const index = state.findIndex((bug) => bug.id === action.payload.id);
			state.list[index].resolved = true;
		},

		bugAssignedToMember: (state, action) => {
			const { bugId, memberId } = action.payload;
			const index = state.findIndex((bug) => bug.id == bugId);
			state.list[index].memberId = memberId;
		},
	},
});

// Selector unsing createSelector for memoization
export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByTeamMember = (memberId) =>
	createSelector(
		(state) => state.entities.bugs,
		(bugs) => bugs.filter((bug) => bug.memberId === memberId)
	);

export const {
	bugAdded,
	bugResolved,
	bugRemoved,
	bugAssignedToMember,
} = slice.actions;
export default slice.reducer;
