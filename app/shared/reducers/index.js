// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import settings from './settings';

const rootReducer = combineReducers({
  router,
  settings
});

export default rootReducer;
