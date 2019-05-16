import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPost, getPosts, editPost, finishToggle, deletePost } from '../actions/postActions';
import { Spinner, Alert, Button } from 'reactstrap';
import Item from './Item';
import '../styles/CreatePostStyle.css'


class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
        this.onFinish = this.onFinish.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(id) {
        this.props.deletePost(id);
    }

    onFinish(id, index) {
        this.props.finishToggle(id, index);
    }

    componentDidMount() {
        console.log("This is componentDidMount");
        this.props.getPosts();
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate");
        console.log(nextProps);
    }

    render() {
        const { posts } = this.props;
        let postView;
        if (posts === null || posts === undefined) {
            postView = <Spinner color="primary" />;
        } else {
            postView = this.props.posts.map((post, index) => {
                return (
                    <Item
                        key={post._id}
                        post={post}
                        index={index}
                        onDelete={this.onDelete}
                        onFinish={this.onFinish} />
                );
            });
        }
        return (
            <div>
                {postView}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(
    mapStateToProps,
    { addPost, getPosts, editPost, finishToggle, deletePost }
)(TodoList);
