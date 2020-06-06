import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => (next) => async (action) => {
	if (action.type !== actions.apiCallBegan.type) return next(action);
	next(action);
	const { url, method, data, onSuccess, onError } = action.payload;

	try {
		const response = await axios.request({
			baseURL: 'http://localhost:9001/api',
			url, //endpoint only eg: /bugs
			method,
			data,
		});
		//general
		dispatch(actions.apiCallSuccess(response.data));
		//sepecific
		dispatch({ type: onSuccess, payload: response.data });
	} catch (error) {
		//general error action
		dispatch(actions.apiCallFailed(error));
		//specific errors
		if (onError) dispatch({ type: onError, payload: error });
	}
};

export default api;
