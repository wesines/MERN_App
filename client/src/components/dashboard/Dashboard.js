import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListUsers } from '../../actions/listUsers';
import { PropTypes } from 'prop-types';

import Spinner from '../layout/Spinner';

export const Dashboard = ({
  getListUsers,
  auth: { user },
  listUsers: { listUsers, loading },
}) => {
  useEffect(() => {
    getListUsers();
  }, []);
  console.log('hello', listUsers);
  return loading && listUsers === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-info'>Users</h1>
      <div className='  font-size: 1.5rem,  margin-bottom: 1rem;'>
        <i className='fas fa-user'></i>
        welcome {user && user.firstname + ' ' + user.lastname}
        <br />
        <div className='profiles'>
          {listUsers.length > 0 ? (
            listUsers.map((list) => (
              <div key={list._id} className='profile bg-light'>
                <img src={list.avatar} alt='' className='round-img' />
                <div>
                  <h2>{list.lastname}</h2>

                  <Link to={`/users/${list._id}`} className='btn btn-primary'>
                    View Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h4>No users found...</h4>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getListUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  listUsers: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  listUsers: state.listUsers,
});
export default connect(mapStateToProps, { getListUsers })(Dashboard);
