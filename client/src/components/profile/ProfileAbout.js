import React , {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile:{
    bio,
    skills,
    user:{firstname}
}}) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
       <h2 className="text-info">{firstname} Bio</h2>
        <p>
         {bio}
        </p>
                </Fragment>
            )}
       
        <div className="line"></div>
        <h2 className="text-info">Skill Set</h2>
        <div className="skills">
         {skills.map((skill,index)=>(
             <div key={index} claaName="p-1">
                 
                <i className="fas fa-check"></i>{skill}
             </div>
         )
         )}   </div>
      </div>

    )
}

ProfileAbout.propTypes = {
profile:PropTypes.object.isRequired,
}

export default ProfileAbout
