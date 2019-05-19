import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, CustomInput, FormFeedback } from 'reactstrap';
import { editPost } from '../actions/postActions';
import '../styles/CreatePostStyle.css'

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            deadline: null,
            priority: "보통",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onClick(e) {
        e.preventDefault();

        const newPost = {
            id: this.props.match.params.id,
            title: this.state.title,
            content: this.state.content,
            deadline: this.state.deadline,
            priority: this.state.priority
        };

        this.props.editPost(newPost, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {title, content, deadline} = this.state.errors;

        let TitleInputField = (title) ?
            <Input invalid type="text" name="title" onChange={this.onChange} /> :
            <Input type="text" name="title" onChange={this.onChange} />

        let ContentInputField = (content) ?
            <Input invalid type="textarea" name="content" onChange={this.onChange} /> :
            <Input type="textarea" name="content" onChange={this.onChange} />

        let DeadlineInputField = (deadline) ?
            <Input invalid type="date" name="deadline" onChange={this.onChange} placeholder="date placeholder" /> :
            <Input type="date" name="deadline" onChange={this.onChange} placeholder="date placeholder"/>

        return (
            <div className="formStyle">
                <h2>Edit Todo</h2>
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        {TitleInputField}
                        <FormFeedback>{title}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        {ContentInputField}
                        <FormFeedback>{content}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Deadline</Label>
                        {DeadlineInputField}
                        <FormFeedback>{deadline}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="priority">Priority</Label>
                        <CustomInput type="select" id="selectform" name="priority" onChange={this.onChange}>
                            <option value="">select</option>
                            <option>보통</option>
                            <option>중요</option>
                            <option>매우 중요</option>
                        </CustomInput>
                    </FormGroup>
                    <Button onClick={this.onClick}>Edit</Button>
                </Form>
            </div>
        )
    }
}

EditPost.propTypes = {
    editPost : PropTypes.func.isRequired,
    posts : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editPost }
)(EditPost);
