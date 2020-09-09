import axios from 'axios';
import { setAlert } from './alert';

import { GET_LIST_USERS, ERROR_LIST_USER } from './types';

//Get Users List

export const getListUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users');
    dispatch({
      type: GET_LIST_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_LIST_USER,
      payload: { msg: err.response.statutsText, status: err.response.status },
    });
  }
};
