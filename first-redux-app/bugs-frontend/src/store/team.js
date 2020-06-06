import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;
const slice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		userAdded: (state, action) => {
			state.push({
				userId: ++lastId,
				user: action.payload.user,
			});
		},
	},
});

export const { userAdded } = slice.actions;
export default slice.reducer;
