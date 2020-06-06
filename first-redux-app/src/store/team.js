import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;
const slice = createSlice({
	name: 'teams',
	initialState: [],
	reducers: {
		teamMemberAdded: (state, action) => {
			state.push({
				memberId: ++lastId,
				teamMember: action.payload.teamMember,
			});
		},
	},
});

export const { teamMemberAdded } = slice.actions;
export default slice.reducer;
