import configureStore from './store/configureStore';
import { loadBugs, resolveBug } from './store/bugs';

const store = configureStore();

//UI Layer
store.dispatch(loadBugs());
store.dispatch(resolveBug(1, 4));
