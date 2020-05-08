import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

//import individual reducers
import game from './game/game';
import login from './login/login';
import user from './user/user';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    game,
    login,
    user
  });
}
