// Action Types
import moment from 'moment';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

const slice = createSlice({
	name: 'bugs',
	initialState: {
		list: [],
		loading: true,
		lastFetch: null,
	},
	reducers: {
		//actions => action handlers
		bugsRequested: (state, action) => {
			state.loading = true;
		},
		bugsRequestFailed: (state, action) => {
			state.loading = false;
		},

		bugsReceived: (state, action) => {
			state.list = action.payload;
			state.loading = false;
			state.lastFetch = Date.now(); //Time stamp
		},
		bugAdded: (state, action) => {
			state.list.push(action.payload);
		},
		bugRemoved: (state, action) => {
			return state.list.filter((bug) => bug.id !== action.payload.id);
		},
		bugResolved: (state, action) => {
			const index = state.list.findIndex((bug) => bug.id === action.payload.id);
			state.list[index].resolved = true;
		},

		bugAssignedToUser: (state, action) => {
			const { id: bugId, userId } = action.payload;
			const index = state.list.findIndex((bug) => bug.id == bugId);
			state.list[index].userId = userId;
		},
	},
});

//Action Creators
const url = '/bugs';

export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs;

	const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
	if (diffInMinutes < 10) return; //avoids making fetch calls if last call was made less than 10 min ago

	dispatch(
		apiCallBegan({
			url,
			onStart: bugsRequested.type,
			onSuccess: bugsReceived.type,
			onError: bugsRequestFailed.type,
		})
	);
};

export const addBug = (bug) =>
	apiCallBegan({
		url,
		method: 'post',
		data: bug,
		onSuccess: bugAdded.type,
	});

export const resolveBug = (bugId) =>
	apiCallBegan({
		url: `${url}/${bugId}`,
		method: 'patch',
		data: { resolved: true },
		onSuccess: bugResolved.type,
	});

export const assginBug = (bugId, userId) =>
	apiCallBegan({
		url: `${url}/${bugId}`,
		method: 'patch',
		data: { userId },
		onSuccess: bugAssignedToUser.type,
	});

// Selector unsing createSelector for memoization
export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByTeamuser = (userId) =>
	createSelector(
		(state) => state.entities.bugs,
		(bugs) => bugs.filter((bug) => bug.userId === userId)
	);

const {
	bugAdded,
	bugResolved,
	bugAssignedToUser,
	bugsReceived,
	bugsRequested,
	bugsRequestFailed,
} = slice.actions;

export default slice.reducer;
