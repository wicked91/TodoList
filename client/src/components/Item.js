import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
        const { onFinish, post, index } = this.props;
        onFinish(post._id, index);
    }

    render() {
        const { title, content, priority, deadline, finish } = this.props.post;

        let deadlineField;

        if(deadline){
            deadlineField = <Moment format="YYYY/MM/DD">{deadline}</Moment>;
        }

        let badge;
        if (finish) {
            badge = <Badge color="success" pill>완료됨</Badge>;
        } else {
            if(deadline){
                const start = moment(Date.now());
                const end = moment(deadline);
                const diff = end.diff(start, 'days');
                if (diff < 0) {
                    badge = <Badge color="danger" pill>마감됨</Badge>;
                }
            }
        }

        let PriorityBadge;
        if (priority === "보통") {
            PriorityBadge = <Badge color="primary" pill>{priority}</Badge>;
        } else if (priority === "중요") {
            PriorityBadge = <Badge color="warning" pill>{priority}</Badge>;
        } else {
            PriorityBadge = <Badge color="danger" pill>{priority}</Badge>;
        }

        return (
            <div>
                <div className="p-3 my-2 rounded">
                    <Toast>
                        <ToastHeader>
                            {title}
                        </ToastHeader>
                        <ToastBody>
                            {content}
                        </ToastBody>
                        <br />
                        <ToastHeader></ToastHeader>
                        <ToastHeader>
                            {deadlineField}  {(deadlineField) ? "까지": ''} {PriorityBadge} {badge}
                        </ToastHeader>
                        <ButtonGroup size="sm">
                            <Button color="link" onClick={this.onClickFinish.bind(this)}>finish</Button>
                            <Button color="link">
                                <Link to={`edit/${this.props.post._id}`}>edit</Link>
                            </Button>
                            <Button color="link" onClick={this.onClickDelete.bind(this)}>delete</Button>
                        </ButtonGroup>
                    </Toast>
                </div>
            </div>
        )
    }
}

Item.propTypes = {
    index : PropTypes.number.isRequired,
    post : PropTypes.object.isRequired,
    onDelete : PropTypes.func.isRequired,
    onFinish : PropTypes.func.isRequired
}

export default Item;
