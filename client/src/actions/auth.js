//to show an alert to each error
import { setAlert } from './alert';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';

import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register User
export const register = ({
  firstname,
  lastname,
  email,
  password,
  avatar,
  status,
  subscribe,
  readterms,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('body dans auth action');

  const body = JSON.stringify({
    firstname,
    lastname,
    email,
    password,
    avatar,
    status,
    subscribe,
    readterms,
  });
  //console.log('auth body =', body);
  try {
    const res = await axios.post('/api/users', body, config);
    //  console.log('res=', res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      // console.log('error.msg', errors);

      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      /*  errors.forEach((error) =>
        dispatch(setAlert(' mail is already used', 'danger'))
      );*/

      dispatch({
        type: REGISTER_FAIL,
        //   payload: { msg: ' user is already existant', alertType },
        //  payload: { msg: ' user is already existant' },
      });
    }
  }
};

// login User
console.log('login user Action');
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      //console.log('erro.msg', errors.msg);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  }
};

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
