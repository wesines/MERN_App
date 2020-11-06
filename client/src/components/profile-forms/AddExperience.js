//racfp
import React,{Fragment,useState} from 'react'
//with router because redirecting in the action file
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addExperience} from '../../actions/profile'
import 'bootstrap/dist/css/bootstrap.min.css';

const AddExperience = ({addExperience,history}) => {
    const [formData,setFormData]=useState({
        company:'',
        title:'',
        location:'',
        from:'',
        //I want to have 'to' is disabled if current is true
        to:'',
        current:false,
        description:''
    })
    const [toDateDisabled,toggleDisabled]=useState(false);
    const {company,title,location,from,to,current,description}=formData;
    const onChange = (e) => {setFormData({...formData,[e.target.name]:e.target.value})};
 
  
    return (
        <Fragment>
          <h1 className="large text-info">
       Add An Experience
      </h1>
      <p className=' font-size: 1.5rem,  margin-bottom: 1rem;'>
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=> {
        e.preventDefault();
        addExperience(formData,history)
      }} >
       
        <div className='form-group'>
          <input
            type='text'
            placeholder='title'
            name='title'
            value={title}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company}   onChange={(e) => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location}  onChange={e=>onChange(e)} />
        </div> 
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from}  onChange={e=>onChange(e)} />
        </div>
         <div  className='form-group custom-control custom-checkbox custom-control-inline'>
      
          <input className='custom-control-input' id='defaultInline1' type="checkbox" name="current" checked={current} value={current}  
          onChange={e=>{setFormData({...formData,current:!current});
        toggleDisabled(!toDateDisabled);
        }} /> <label
        className='custom-control-label'
        htmlFor='defaultInline1'
        style={{ marginLeft: 20 }}
      > Current Job</label>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to}  onChange={e=>onChange(e)} disabled={toDateDisabled? 'disabled' :'' } />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>   
        </Fragment>
    )
}

AddExperience.propTypes = {
addExperience:PropTypes.func.isRequired,
}
//we add the action addexpereince to connect 
export default connect(null,{addExperience})(withRouter(AddExperience));
