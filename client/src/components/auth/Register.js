import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MDBInput, MDBFormInline } from 'mdbreact';
/* eslint-disable import/first */
// eslint-disable-next-line no-restricted-globals
// eslint-disable-next-line
import { setAlert } from '../../actions/alert';
//la fonction register de l'action auth
import { register } from '../../actions/auth';

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

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('change', subscribe);
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
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='LastName'
            name='lastname'
            value={lastname}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            required
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
            required
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
            required
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
            style={{ marginLeft: -10 }}
            type='file'
            placeholder='picture'
            name='picture'
            value={picture}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div
          className='custom-control custom-checkbox custom-control-inline'
          className='form-group'
        >
          <input
            className='custom-control-input'
            id='defaultInline1'
            //  style={{ marginLeft: -510 }}
            type='checkbox'
            name='nomSub'
            checked={formData.subscribe}
            onChange={(e) =>
              setFormData({
                ...formData,
                subscribe: e.target.checked,
              })
            }
          />

          <label
            className='custom-control-label'
            htmlFor='defaultInline1'
            style={{ marginLeft: 20 }}
          >
            Subcribe to our newsletter
          </label>
        </div>
        <div
          className='custom-control custom-checkbox custom-control-inline'
          className='form-group'
        >
          <input
            className='custom-control-input'
            id='defaultInline2'
            name='nomRead'
            type='checkbox'
            checked={formData.readterms}
            onChange={(e) =>
              setFormData({
                ...formData,
                readterms: e.target.checked,
              })
            }
          />
          <label
            className='custom-control-label'
            htmlFor='defaultInline2'
            style={{ marginLeft: 20 }}
          >
            Accepts the terms and conditions
          </label>
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
