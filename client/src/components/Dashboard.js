import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPost, getPosts, editPost, deletePost } from '../actions/postActions';
import {Alert} from 'reactstrap';
import Header from './Header';
import TodoList from './TodoList';
import '../styles/CreatePostStyle.css'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <div>
                    <div>
                        <Header/>
                        <TodoList />
                    </div>
                </div> 
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
