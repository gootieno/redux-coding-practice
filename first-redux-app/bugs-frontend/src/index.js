import configureStore from './store/configureStore';
const store = configureStore();

store.dispatch({ type: 'errors', payload: { message: 'An error occured' } });
