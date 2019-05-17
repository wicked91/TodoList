import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPost, getPosts, editPost, finishToggle, deletePost } from '../actions/postActions';
import { Spinner, Container, Row, Col } from 'reactstrap';
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
                    <Col xs="6" sm="4">
                        <Item
                            key={post._id}
                            post={post}
                            index={index}
                            onDelete={this.onDelete}
                            onFinish={this.onFinish} />
                    </Col>
                );
            });
        }
        return (
            <div>

                <Container>
                    <Row>{postView}</Row>
                </Container>
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
