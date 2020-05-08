import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { Store, appStateType } from '../reducers/combinedType';
import urls from '../utils/urls';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk.withExtraArgument({ api: urls.primary.production }), router);

function configureStore(initialState?: appStateType): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
