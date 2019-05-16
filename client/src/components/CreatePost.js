import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { addPost, getPosts, editPost, deletePost } from '../actions/postActions';
import '../styles/CreatePostStyle.css'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            duedate: '',
            priority: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();

        const newPost = {
            title: this.state.title,
            content: this.state.content,
            duedate: this.state.duedate,
            priority: this.state.priority
        };

        this.props.addPost(newPost, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="mainStyle">
                <Form>
                    <FormGroup>
                        <Label for="exampleCity">Title</Label>
                        <Input type="text" name="title" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Content</Label>
                        <Input type="textarea" name="content" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleDate">Due Date</Label>
                        <Input
                            type="date"
                            name="duedate"
                            onChange={this.onChange}
                            placeholder="date placeholder"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleCustomSelect">Priority</Label>
                        <CustomInput type="select" id="selectform" name="priority" onChange={this.onChange}>
                            <option value="">select</option>
                            <option>Normal</option>
                            <option>Important</option>
                            <option>Very Important</option>
                        </CustomInput>
                    </FormGroup>
                    <Button onClick={this.onClick}>Create</Button>
                </Form>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(
    mapStateToProps,
    { addPost }
)(CreatePost);
