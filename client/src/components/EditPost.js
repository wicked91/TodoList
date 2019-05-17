import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, CustomInput, FormFeedback } from 'reactstrap';
import Moment from 'react-moment';
import { editPost } from '../actions/postActions';
import '../styles/CreatePostStyle.css'

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            deadline: '',
            priority: "",
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

        let TitleInputField = (title === null || title === undefined) ?
            <Input type="text" name="title" onChange={this.onChange}/>:
            <Input invalid type="text" name="title" onChange={this.onChange} />

        let ContentInputField = (content === null || content === undefined) ?
            <Input type="textarea" name="content" onChange={this.onChange}/>: 
            <Input invalid type="textarea" name="content" onChange={this.onChange} />

        let DeadlineInputField = (deadline === null || deadline === undefined) ?
            <Input type="date" name="deadline" onChange={this.onChange} placeholder="date placeholder"/>:
            <Input invalid type="date" name="deadline" onChange={this.onChange} placeholder="date placeholder"/>

        return (
            <div className="mainStyle">
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
                            <option value="Normal">select</option>
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
    posts: state.posts,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editPost }
)(EditPost);
