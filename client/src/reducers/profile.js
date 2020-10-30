import { CLEAR_PROFILE, GET_REPOS,PROFILE_ERROR, GET_PROFILES,GET_PROFILE,UPDATE_PROFILE } from '../actions/types';

const initialState = {
  //detailUser to profile && listUsers to profiles
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
      case GET_PROFILES:
      return{
        ...state,
        profiles:payload,
        loading:false,
      }
      case GET_REPOS:
        return{
          ...state,
          repos:payload,
          loading:false,
        }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        repos: [],
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
}

/*
   
   
   
   
   
    case GET_LIST_USERS:
      return {
        ...state,
        profiles: payload,
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
        profile: payload,
        loading: false,
      };
    case DETAIL_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };

    case CLEAR_USER:
      return {
        ...state,
        profiles: [],
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
}
*/
