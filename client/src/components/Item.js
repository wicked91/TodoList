import React, { Component } from 'react'
import { Toast, ToastBody, ToastHeader, Button, ButtonGroup, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';

class Item extends Component {

    onClickDelete = () => {
        const { onDelete, post } = this.props;
        onDelete(post._id);
    }

    onClickFinish = () => {
        const { onFinish, post } = this.props;
        onFinish(post._id, this.props.index);
    }

    render() {
        let badge;
        if (this.props.post.finish) {
            badge=  <Badge color="success" pill>완료됨</Badge>;
        } else {
            const start = moment(Date.now());
            const end = moment(this.props.post.deadline);
            const diff = end.diff(start, 'days');
            if (diff < 0) {
                badge =  <Badge color="danger" pill>마감됨</Badge>;
            }
        }

        return (
            <div>
                <div className="p-3 my-2 rounded">
                    <Toast>
                        <ToastHeader>
                            {this.props.post.title} {badge}
                        </ToastHeader>
                        <ToastBody>
                            {this.props.post.content}
                        </ToastBody>
                        <ToastHeader>
                            Deadline : <Moment format="YYYY/MM/DD">{this.props.post.deadline}</Moment>
                            <br />
                            Priority : {this.props.post.priority}
                        </ToastHeader>
                        <ToastHeader>
                            <ButtonGroup size="sm">
                                <Button color="link" onClick={this.onClickFinish.bind(this)}>finish</Button>
                                <Button color="link">
                                    <Link to={`edit/${this.props.post._id}`}>edit</Link>
                                </Button>
                                <Button color="link" onClick={this.onClickDelete.bind(this)}>delete</Button>
                            </ButtonGroup>
                        </ToastHeader>
                    </Toast>
                </div>
            </div>
        )
    }
}

export default Item;
