import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/* eslint-disable import/first */
// eslint-disable-next-line no-restricted-globals
// eslint-disable-next-line
const axios = require('axios');
import { setAlert } from '../../actions/alert';
//la fonction register de l'action auth
import { register } from '../../actions/auth';
import e from 'express';

const Register = ({ setAlert, register }) => {
  //for states, an object that contains fields values : formData
  //function we ll used to update fields
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    password2: '',
    picture: '',
    status: '',
    readterms: false,
    subscribe: false,
  });
  const {
    lastname,
    firstname,
    email,
    password,
    password2,
    picture,
    status,
    readterms,
    subscribe,
  } = formData;
  // const [Checked, setChecked] = React.useState(undefined);
  // const handlecheck = (e) => {
  //  this.setformData({ readterms: e.target.checked });
  // };
  const onChange = (e) => {
    // console.log('subscribe', subscribe);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const setCheckedSubs = (e) => {
    setFormData({
      [readterms]: e.target.checked,
    });
  };
  const setCheckedTerms = (e) => {
    setFormData({
      [readterms]: e.target.checked,
    });
  };
  const onSubmit = async (e) => {
    //pour que la page ne se recharge pas
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setAlert('password do not match ', 'danger');
    } else {
      console.log('body dans register =', firstname);
      register({
        firstname,
        lastname,
        email,
        password,
        picture,
        status,
        readterms,
        subscribe,
      });
      /*   try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
        };

        const body = JSON.stringify(formData);
        console.log('body', body);
        const res = await axios.post('/api/users', body, config);
        console.log('res', res.data);
      } catch (err) {
        console.log('erreur axios', err);
      }*/
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Registration</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='FirstName'
            name='firstname'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='LastName'
            name='lastname'
            value={lastname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option>--- Select a status ---</option>
            <option value='Teacher'>Teacher</option>
            <option value='Assistant'>Assistant</option>
            <option value='Student'>Student</option>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='file'
            placeholder='picture'
            name='picture'
            value={picture}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          Subscribed
          <input
            type='checkbox'
            checked={subscribe}
            onChange={(e) => setCheckedSubs(e)}
          />
        </div>
        Terms read
        <div className='form-group'>
          <input
            type='checkbox'
            checked={readterms}
            // onChange={(e) => handlecheck(e)}
            onChange={(e) => setCheckedTerms(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  //ptfr et entree
  register: PropTypes.func.isRequired,
};
export default connect(null, { setAlert, register })(Register);
