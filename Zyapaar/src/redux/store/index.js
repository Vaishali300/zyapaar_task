import { createStore, applyMiddleware, compose } from 'redux'

import { createHashHistory } from 'history';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const history = createHashHistory();
// const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose

function configureStore(initialState = {}) {
    const store = createStore(reducers(history), initialState, applyMiddleware(thunk));
    return store;
}
export default configureStore;
export { history };