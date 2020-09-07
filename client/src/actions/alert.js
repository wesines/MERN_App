import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
//to dispatch more than action we can do an arroaw dispatch and another for the body
export const setAlert = (msg, alertType) => (dispatch) => {
  console.log('alertType', alertType);
  console.log('msg', msg);
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
