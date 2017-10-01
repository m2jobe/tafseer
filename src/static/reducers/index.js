import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import authReducer from './auth';
import dataReducer from './data';
const reducers = {
  auth: authReducer,
  data: dataReducer,
  routing: routerReducer,
  settings
};


module.exports = combineReducers(reducers);
