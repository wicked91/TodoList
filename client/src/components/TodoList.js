import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, finishToggle, deletePost } from '../actions/postActions';
import { Spinner} from 'reactstrap';
import Item from './Item';
import '../styles/CreatePostStyle.css'

class TodoList extends Component {

    constructor(props) {
        super(props);
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
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props.posts;
        let postView;
        if (posts === null || posts === undefined) {
            postView = <Spinner color="primary" />;
        } else {
            postView = posts.map((post, index) => {
                return (
                    <Item
                        key={post._id}
                        index={index}
                        post={post}
                        onDelete={this.onDelete}
                        onFinish={this.onFinish} />
                );
            });
        }
        return (
            <div className="divStyle">
                {postView}
            </div>
        )
    }
}

TodoList.propTypes = {
    getPosts : PropTypes.func.isRequired,
    finishToggle : PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired,
    posts : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(
    mapStateToProps,
    { getPosts, finishToggle, deletePost }
)(TodoList);
