import configureStore from './store/configureStore';
import { loadBugs, assginBug } from './store/bugs';

const store = configureStore();

//UI Layer
store.dispatch(loadBugs());
setTimeout(() => store.dispatch(assginBug(1, 4)), 2000);
