// Action Types
const BUG_ADDED = 'bugAdded';
const BUG_REMOVED = 'bugRemoved';
const BUG_RESOLVED = 'bugResolved';

//Action Creators
export const bugAdded = (description) => ({
	type: BUG_ADDED,
	payload: {
		description,
	},
});

export const bugRemoved = (id) => ({
	type: BUG_REMOVED,
	payload: {
		id,
	},
});

export const bugResolved = (id) => ({
	type: BUG_RESOLVED,
	payload: {
		id,
	},
});

let lastId = 0;

export default function reducer(state = [], action) {
	//We need to set the state as an empty array otherwise the state will be initialized as undefined
	if (action.type === BUG_ADDED) {
		return [
			...state,
			{
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			},
		];
	} else if (action.type === BUG_REMOVED) {
		// Here we need to return an array of bugs that do not include the id of the removed bug
		return state.filter((bug) => bug.id !== action.payload.id);
	} else if (action.type === BUG_RESOLVED) {
		return state.map((bug) =>
			bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
		);
	}

	return state;
}
