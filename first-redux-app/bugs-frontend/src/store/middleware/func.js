const func = ({ dispatch, getState }) => (next) => (action) => {
	if (typeof action === 'function') action(dispatch, getState);
	else if (typeof action === 'error') console.log('Toastify: ');
	else next(action);
};

export default func;
