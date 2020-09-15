import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getDetailUserById, editUser } from '../../actions/listUsers';

export const UserDetails = ({
  getDetailUserById,
  editUser,
  listUsers: { detailUser, loading, listUsers },
  auth,
  match,
}) => {
  const [formData, setFormData] = useState({
    firstname: '',
  });
  const { firstname } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    //pour que la page ne se recharge pas
    e.preventDefault();
    console.log('formDtata', formData);
    editUser(formData._id);
  };

  useEffect(() => {
    getDetailUserById(match.params.id);
  }, [loading, getDetailUserById]);

  return (
    <Fragment>
      {detailUser === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-top    p-2'>
            <img className='round-img my-1' src={detailUser.avatar} alt='' />
            <h1 className='large text-info'>
              {detailUser.firstname} {detailUser.lastname}
            </h1>
          </div>
          <div className='profile bg-light'>
            <ul>
              <li>
                <span className='text-info'>Email : </span>
                <span> {detailUser.email}</span>
              </li>
            </ul>
            <ul>
              <li>
                {' '}
                <span className='text-info'>Status :</span>
                <span> {detailUser.status}</span>
              </li>
            </ul>
            <p>
              <ul>
                {!detailUser.subscribe ? (
                  <li className='text-info'>
                    <i className='far fa-clone'>Subscribed</i>
                  </li>
                ) : (
                  <li className='text-info'>
                    {' '}
                    <i className='fas fa-clone'>Subscribed</i>
                  </li>
                )}
                {!detailUser.readterms ? (
                  <li className='text-info'>
                    <i className='far fa-clone'>Terms are read</i>
                  </li>
                ) : (
                  <li className='text-info'>
                    {' '}
                    <i className='fas fa-clone'>Terms are read</i>
                  </li>
                )}
              </ul>
            </p>
          </div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === detailUser._id && (
              <Fragment>
                <span className='btn btn-dark'>Edit your Profile</span>

                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <input
                      type='firstname'
                      placeholder='Email Address'
                      name='firstname'
                      value={detailUser.firstname}
                      //   required
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div>
                    <input
                      type='submit'
                      className='btn btn-primary'
                      value='Update'
                    />
                  </div>
                </form>
              </Fragment>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};
//ptfr et entree
UserDetails.propTypes = {
  getDetailUserById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  detailUser: state.detailUser,
  listUsers: state.listUsers,
});
export default connect(mapStateToProps, { getDetailUserById })(UserDetails);
