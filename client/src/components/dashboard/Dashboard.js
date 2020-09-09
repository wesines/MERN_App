import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListUsers } from '../../actions/listUsers';
import { PropTypes } from 'prop-types';

export const Dashboard = ({ getListUsers, auth, listUsers }) => {
  useEffect(() => {
    getListUsers();
  }, []);
  return <div>Dashboard</div>;
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
