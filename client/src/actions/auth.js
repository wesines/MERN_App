//to show an alert to each error
import { setAlert } from './alert';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
// register User
export const register = ({
  firstname,
  lastname,
  email,
  password,
  picture,
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
    picture,
    status,
    subscribe,
    readterms,
  });
  console.log('body=', body);
  try {
    const res = await axios.post('/api/users', body, config);
    console.log('res=', res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
