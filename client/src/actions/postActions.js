import axios from 'axios';

import {
    GET_POSTS,
    TOGGLE_POST,
    DELETE_POST,
    GET_ERROR,
    CLEAR_ERROR
} from './types';

export const addPost = (newPost, history) => dispatch => {
    dispatch(clearErrors());
    axios.post('/posts', newPost)
        .then(res => { history.push('/') })
        .catch(err => {
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            });
        });
};

export const getPosts = () => dispatch => {
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data.data
            })
        })
        .catch(err => {
            console.log(err);
        });
};

export const editPost = (newPost, history) => dispatch => {
    dispatch(clearErrors());
    axios.post('/posts/edit', newPost)
        .then(res => { history.push('/'); })
        .catch(err => {
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            });
        });
};

export const finishToggle = (id, index) => dispatch => {
    axios.get(`/posts/toggle/${id}`)
        .then(res => {
            dispatch({
                type: TOGGLE_POST,
                payload: res.data.data.finish,
                index: index
            })
        })
        .catch(err => {
            console.log(err);
        });
};

export const deletePost = id => dispatch => {
    axios.delete(`/posts/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        })
        .catch(err => {
            console.log(err);
        });
};

export const clearErrors = () => {
    return {
      type: CLEAR_ERROR
    };
  };
  