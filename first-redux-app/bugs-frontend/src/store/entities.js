import { combineReducers } from 'redux';

import bugsReducer from './bugs';
import projectReducer from './projects';
import teamReducer from './team';

export default combineReducers({
	bugs: bugsReducer,
	projects: projectReducer,
	team: teamReducer,
});
