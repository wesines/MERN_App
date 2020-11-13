import React,{ useState} from 'react'
import PropTypes from 'prop-types'
import {connect}from 'react-redux'
import {addPost} from '../../actions/post'


const PostForm = ({  addPost }) => {
    const [text, setText] = useState('');

    return (
        <div className="post-form">
        <div className="bg-info p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
          e.preventDefault();
          console.log("text",text)
         addPost( { text });
         console.log("addPost=",text)

          setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder="Create a post"
             required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
addPost:PropTypes.func.isRequired,
}

export default connect(null,{addPost})(PostForm)
//null beacause we don't bring any state from redux