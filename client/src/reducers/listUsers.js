import {
  GET_LIST_USERS,
  ERROR_LIST_USER,
  CLEAR_USER,
  GET_USER_DETAIL,
  DETAIL_USER_ERROR,
} from '../actions/types';

const initialState = {
  detailUser: null,
  listUsers: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIST_USERS:
      return {
        ...state,
        listUsers: payload,
        loading: false,
      };
    case ERROR_LIST_USER:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        detailUser: payload,
        loading: false,
      };
    case DETAIL_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        detailUser: null,
      };

    case CLEAR_USER:
      return {
        ...state,
        listUsers: [],
        loading: false,
        detailUser: null,
      };
    default:
      return state;
  }
}
