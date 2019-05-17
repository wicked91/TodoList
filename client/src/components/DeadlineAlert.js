import React from 'react';
import { connect } from 'react-redux';
import { addPost, getPosts, editPost, deletePost } from '../actions/postActions';
import { Alert } from 'reactstrap';

class DeadlineAlert extends React.Component {
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
      <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
        I am an alert and I can be dismissed!
      </Alert>
    );
  }
}


const mapStateToProps = state => ({
    posts: state.posts
});


export default connect(
    mapStateToProps,
    { addPost, getPosts, editPost, deletePost }
)(DeadlineAlert);