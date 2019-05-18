import {
    GET_POSTS,
    TOGGLE_POST,
    DELETE_POST
  } from '../actions/types';
  
  const initialState = {
    posts: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload
        };
      case TOGGLE_POST:
        return {
          ...state,
          posts: [
              ...state.posts.slice(0, action.index),
              {
                  ...state.posts[action.index],
                  finish: action.payload
              },
              ...state.posts.slice(action.index +1, state.posts.length)
          ]
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        };
      default:
        return state;
    }
  }
  