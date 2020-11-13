import axios from 'axios';
import { setAlert } from './alert';

import { PROFILE_ERROR,ACCOUNT_DELETED,GET_REPOS,
   GET_PROFILE,UPDATE_PROFILE,CLEAR_PROFILE, GET_PROFILES } from './types';

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
   
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// get all porfiles

export const getProfiles = () => async (dispatch) => {
  console.log(" hello getprofile action ")

  dispatch({type:CLEAR_PROFILE});
  try { 
    console.log(" try")

    const res = await axios.get('/api/profile');
    console.log(" getProfiles all",res)

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.log("err",err) 

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// get profile by id

export const getProfileByID = (userid) => async (dispatch) => {
  dispatch({type:CLEAR_PROFILE});
  try {
    const res = await axios.get(`/api/profile/user/${userid}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }); 
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get github repos

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    console.log("getgithubrepos Action ");

    const res = await axios.get(`/api/profile/github/${username}`);
    console.log("repos res",res);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or update profile
//history it redirect us to teh previous page
//edit =false we can do it also by creating a sepaerate method which create
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    //if edit is true say 'profile updated else say profile created
    dispatch(setAlert(edit ? 'profile Updated' : 'Profile Created', 'success'));
    //if we edit it we stay in the same page if we create a new profile then we redirect
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      //console.log('erro.msg', errors.msg);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add experience
export const addExperience=(formData,history)=>async dispatch=>{
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added','success'));
    history.push('/dashboard');
 
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      //console.log('erro.msg', errors.msg);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}


// Add education

export const addEducation=(formData,history)=>async dispatch=>{
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added','success'));
    history.push('/dashboard');
 
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      //console.log('erro.msg', errors.msg);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}


// Delete experience 
export const deleteExperience = id => async dispatch => {
  console.log("helloe delete experience");
  try{
    const res=await axios.delete(`api/profile/experience/${id}`);
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    })
    dispatch(setAlert('Experience Removed' ,'succes'));
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Delete education 
export const deleteEducation = id => async dispatch => {
  try{
    const res=await axios.delete(`api/profile/education/${id}`);
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    })
    dispatch(setAlert('Education Removed' ,'succes'));
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

//delete account and profile
export const deleteAccount=()=>async dispatch=>{
  if(window.confirm('Are you sure to delete this account ? this can not be undone')){
  try{
   await axios.delete('/api/profile');
    dispatch({    type:CLEAR_PROFILE  })
    dispatch({    type:ACCOUNT_DELETED  })

    dispatch(setAlert('Your account has been permanantly deleted' ));
    
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
}

