import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');
const Register = () => {
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
    readtermes: '',
    subscribe: '',
  });
  const {
    lastname,
    firstname,
    email,
    password,
    password2,
    picture,
    status,
    subscribe,
    readterms,
  } = FormData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      console.log('password do not match ');
    } else {
      const newUser = {
        firstname,
        lastname,
        status,
        picture,
        email,
        password,
        subscribe,
        readterms,
      };
      try {
        console.log('header');
        const config = {
          headers: { 'Content-Type': 'application/json' },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('/localhost:5000/api/users', body, config);
        console.log('res', res.data);
      } catch (err) {
        console.log('erreur axios', err);
      }
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
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='LastName'
            name='lastname'
            value={lastname}
            onChange={(e) => onChange(e)}
            required
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
            placeholder='subscribe'
            name='subscribe'
            value={subscribe}
            onChange={(e) => onChange(e)}
          />
        </div>
        Terms read
        <div className='form-group'>
          <input
            type='checkbox'
            placeholder='readterms'
            name='readterms'
            value={readterms}
            onChange={(e) => onChange(e)}
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

export default Register;
