import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPost, getPosts, editPost, deletePost } from '../actions/postActions';
import {Alert, Button } from 'reactstrap';
import TodoList from './TodoList';
import '../styles/CreatePostStyle.css'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div>
                <div className="mainStyle">
                    <div>
                        <Link to="/create" >
                            <Button color="success">New</Button>
                        </Link>
                        <TodoList/>
                    </div>
                </div>
                {/* <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    I am an alert and I can be dismissed!
                </Alert> */}
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
