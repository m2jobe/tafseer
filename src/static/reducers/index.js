import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import dataReducer from './data';
import settingsReducer from './settings';

const reducers = {
  data: dataReducer,
  settings: settingsReducer,
  routing: routerReducer,
};


module.exports = combineReducers(reducers);
