import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FileUpload from './Fileuploaded/FileUpload';
import 'bootstrap/dist/css/bootstrap.min.css';
/* eslint-disable import/first */
// eslint-disable-next-line no-restricted-globals
// eslint-disable-next-line
import { setAlert } from '../../actions/alert';
//la fonction register de l'action auth
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  //for states, an object that contains fields values : formData
  //function we ll used to update fields
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    password2: '',
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
    password,
    password2,
    status,
    readterms,
    subscribe,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    //pour que la page ne se recharge pas
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setAlert('password do not match ', 'danger');
    } else {
      register({
        firstname,
        lastname,
        email,
        avatar,
        password,
        status,
        readterms,
        subscribe,
      });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/users' />;
  }

  return (
    <Fragment>
      <h1 className='text-info'>Registration</h1>
      <p className=' font-size: 1.5rem,  margin-bottom: 1rem;'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='FirstName'
            name='firstname'
            //   required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='LastName'
            name='lastname'
            value={lastname}
            //   required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            //   required
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
            //  required
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
            //   required
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
            I have read terms and conditions
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
//ptfr et entree
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
//connect has two arguments:
// any  state that you want to map you can put null
// an object that with any action you wanna use
