import axios from 'axios';

import {
    GET_POSTS,
    ADD_POST,
    TOGGLE_POST,
    DELETE_POST
} from './types';

export const addPost = (newPost, history) => dispatch => {
    axios.post('/posts', newPost)
        .then(res => { history.push('/') })
        .catch(err => {
            console.log(err);
        });
};

export const getPosts = () => dispatch => {
    axios.get('/posts/all')
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });
};

export const editPost = (newPost, history) => dispatch => {
    axios.post('/posts/edit', newPost)
        .then(res => { history.push('/'); })
        .catch(err => {
            console.log(err);
        });
};

export const finishToggle = (id, index) => dispatch => {
    axios.get(`/posts/toggle/${id}`)
        .then(res => {
            dispatch({
                type: TOGGLE_POST,
                payload: res.data,
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