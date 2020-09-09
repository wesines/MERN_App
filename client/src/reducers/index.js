import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import listUsers from './listUsers';

export default combineReducers({ alert, auth, listUsers });
