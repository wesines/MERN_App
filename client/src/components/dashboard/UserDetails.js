import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getDetailUserById } from '../../actions/listUsers';

import { editUser } from '../../actions/listUsers';

export const UserDetails = ({
  getDetailUserById,
  editUser,
  listUsers: { detailUser, loading, listUsers },
  auth,
  match,
}) => {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    avatar: '',
    status: '',
    readterms: false,
    subscribe: false,
  });

  const {
    lastname,
    firstname,
    email,
    avatar,
    status,
    readterms,
    subscribe,
  } = formData;
  const onChange = (e) => {
    console.log('firstname', firstname);
    console.log('e.target.name', e.target.name);
    console.log('e.target.value', e.target.value);
    setFormData({
      ...formData,
      lastname: detailUser.lastname,
      email: detailUser.email,
      avatar: detailUser.avatar,
      status: detailUser.status,
      readterms: detailUser.readterms,
      subscribe: detailUser.subscribe,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    //pour que la page ne se recharge pas
    e.preventDefault();
    console.log('formdata.firstname', formData.firstname);
    editUser(detailUser._id, formData);
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
          </div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === detailUser._id && (
              <Fragment>
                <span className='btn btn-dark'>Edit your Profile</span>

                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='First Name'
                      name='firstname'
                      value={firstname}
                      onChange={onChange}
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
export default connect(mapStateToProps, { editUser, getDetailUserById })(
  UserDetails
);
