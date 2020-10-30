import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const profileItem = ({profile:{user:[_id,firstname, avatar],
                    status,
                company,
            location,
        skills}}) => {
    return (
        <div classNane="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{firstname}</h2>
    <p>{status} {company && <span> {location}</span>}</p>
<Link to={`/profile/${_id}`} className="btn btn-primary">
    View Profile
</Link>
            </div>
            <ul> {skills.slice(0.4).map((skill,index)=>(
                <li key={index} className="text-info">
                    <i classNmae="fas fa-check" /> {skill}
                </li>
            ))}
            </ul>
        </div>
    )
}

profileItem.propTypes = {
profile:PropTypes.object.isRequired,
}

export default profileItem
