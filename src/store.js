import { createStore, applyMiddleware, compose } from 'redux';

import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
// import createLogger from 'redux-logger';

import reducers from './reducers';

// const logger = createLogger();
// const middleware = applyMiddleware(ReduxThunk, ReduxPromise, logger);
const middleware = applyMiddleware(ReduxThunk, ReduxPromise);

export default createStore(reducers, compose(middleware));
