import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPost, getPosts, editPost, deletePost } from '../actions/postActions';
import Header from './Header';
import TodoList from './TodoList';
import '../styles/CreatePostStyle.css'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <Header />
                <TodoList />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(
    mapStateToProps,
    { addPost, getPosts, editPost, deletePost }
)(Dashboard);
