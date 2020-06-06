const errors = (store) => (next) => (action) => {
	if (action.type === 'errors')
		console.log('Toastify: ', action.payload.message);
	else next(action);
};

export default errors;
