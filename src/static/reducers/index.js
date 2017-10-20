import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import authReducer from './auth';
import dataReducer from './data';
import settingsReducer from './settings';

const reducers = {
  auth: authReducer,
  data: dataReducer,
  settings: settingsReducer,
  routing: routerReducer,
};


module.exports = combineReducers(reducers);
