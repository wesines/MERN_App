import axios from 'axios';
const setAuthToken = (token) => {
  if (token) {
    //if the token is there we add it in the header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
