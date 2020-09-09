import { GET_LIST_USERS, ERROR_LIST_USER } from '../actions/types';

const initialState = {
  listUsers: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIST_USERS:
      return {
        ...state,
        payload: payload,
        loading: false,
      };
    case ERROR_LIST_USER:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
