import axios from 'axios';
import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_LIST_USERS,
  ERROR_LIST_USER,
  GET_USER_DETAIL,
  DETAIL_USER_ERROR,
  CLEAR_USER,
} from './types';

//Get Users List

export const getListUsers = () => async (dispatch) => {
  dispatch({ type: CLEAR_USER });
  try {
    const res = await axios.get('/api/users');
    dispatch({
      type: GET_LIST_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_LIST_USER,
      payload: { msg: 'List user empty' },
    });
  }
};

// Get profile by ID
export const getDetailUserById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/api/users/${userId}`);
    console.log('res', res);
    dispatch({
      type: GET_USER_DETAIL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DETAIL_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update user
export const editUser = (userId, formdata) => async (dispatch) => {
  try {
    console.log('I am in edituser Action formdata = ' + formdata.firstname);
    console.log('I am in edituser Action id = ' + userId);
    const res = await axios.post(`/api/users/${userId}`, formdata);
    console.log('res', res);
    dispatch({
      type: GET_USER_DETAIL,
      payload: res.data,
    });
    dispatch(setAlert('Profile Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: DETAIL_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
