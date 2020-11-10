import {    GET_POSTS,    POST_ERROR, UPDATE_LIKES, DELETE_POST ,ADD_POST}from '../actions/types'


const initialState={
    posts:[],
    posts:null,
    loading:true,
    error:{}
}


export default function (state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case GET_POSTS: 
        return {
            ...state,
            posts : payload,
            loading : false
        };
        case ADD_POST:
            return{
                 ...state,
                //...state.post : just make a copy of it
                post:[...state.post,payload],
//any component that uses the post part of the state it gonna ruturn
//down with the post
                loading:false,
            }
        case DELETE_POST:
            return {
                ...state,
                //we just returning a post except for the one matches here
                //because that we wanna got deleted
                //so we want just immedieatly remove that from the UI (interface utilisateur)
                
                posts:state.posts.filter(post=>post._id !== payload),//remember the payload is just the id
                loading:false,
            }
        case POST_ERROR: 
        return {
            ...state,
            error: payload,
            loading: false
        };
        case UPDATE_LIKES:
        return{
            ...state,
            //map throw this state the post :
            //for each post check to see if it 's the correct one
            // (if it matches payload id) then we wanna return new state with just all the staff in the post, likes 
            //wheater an  add like or remove like they both return an array of likes
            // we update this value likes:payload.likes
            //if ther isn't a match so we return the post and do nothing 
            posts:state.posts.map(post=>post._id===payload.id ? {...post,likes:payload.likes} : post
           ),
           loading:false,
            
        }
        default:
            return state;
    }
}