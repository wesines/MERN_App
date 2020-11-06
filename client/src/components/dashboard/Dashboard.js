import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile,deleteAccount } from '../../actions/profile';
import { PropTypes } from 'prop-types';
import Experience from './Experience';
import Spinner from '../layout/Spinner';
import Education from './Education';


const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-info'>Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.firstname+' '+user.lastname}
      </p>
      {profile !== null ? (
        <Fragment>
  <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-info' /> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-info' /> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-info' /> Add Education
      </Link>
    </div>     
    
    <Experience experience={profile.experience}/>
    <Education education={profile.education}/>
        <div className="my-2">
          <button className='btn btn-danger' onClick={()=>deleteAccount()}>
            <i className="fas fa-user-minus"></i> Delete my account
          </button>
        </div>
          </Fragment>
      ) : (
        <Fragment>
          <p> You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  //anything will to this state reducer will be into this component
  profile: state.profile,
});

export default connect(mapStateToProps, {deleteAccount, getCurrentProfile })(Dashboard);
