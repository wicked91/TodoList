const Post = require('../../models/Post');
const validateInput = require('../../validation/post');

exports.create_post = (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        deadline: req.body.deadline,
        priority: req.body.priority
    });

    newPost
        .save()
        .then(result =>
            res.status(201).json({
                message: "Create post successfully",
                data: result,
                request: {
                    type: "GET",
                    url: "http://" + req.headers.host + "/posts/" + result._id
                }
            })
        )
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.get_post = (req, res) => {
    Post.findById({ _id: req.params.id })
        .select("_id title content deadline priority finish")
        .then(result => {
            if (result) {
                res.status(200).json({
                    data: result,
                    request: {
                        type: "GET",
                        url: "http://" + req.headers.host + "/posts"
                    }
                });
            } else {
                res.status(404).json({
                    message: "No vaild entry found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.get_posts_all = (req, res) => {
    Post.find()
        .select("_id title content deadline priority finish")
        .then(results => {
            const response = {
                count: results.length,
                data: results.map(result => {
                    return {
                        _id: result._id,
                        title: result.title,
                        content: result.content,
                        deadline: result.deadline,
                        priority: result.priority,
                        finish: result.finish,
                        request: {
                            type: "GET",
                            url: "http://" + req.headers.host + "/posts/" + result._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.post_edit = (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const postFields = {};
    if (req.body.id) postFields.id = req.body.id;
    if (req.body.title) postFields.title = req.body.title;
    if (req.body.content) postFields.content = req.body.content;
    if (req.body.deadline) postFields.deadline = req.body.deadline;
    if (req.body.priority) postFields.priority = req.body.priority;

    Post.findById({ _id: req.body.id })
        .then(result => {
            if (result) {
                Post.findOneAndUpdate(
                    { _id: req.body.id },
                    { $set: postFields },
                    { new: true }
                )
                    .then(post => {
                        res.status(200).json({
                            data: post,
                            request: {
                                type: "GET",
                                url: "http://" + req.headers.host + "/posts/" + post._id
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            } else {
                res.status(404).json({
                    message: "No vaild entry found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


exports.post_toggle = (req, res) => {
    Post.findById({ _id: req.params.id })
        .then(post => {
            if (post) {
                const toggle = !post.finish;
                Post.findOneAndUpdate(
                    { _id: post._id },
                    { 'finish': toggle },
                    { new: true }
                )
                    .then(post =>
                        res.status(200).json({
                            message: "Toggle success",
                            data: post,
                            request: {
                                type: "GET",
                                url: "http://" + req.headers.host + "/posts/" + req.params.id
                            }
                        })
                    )
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.post_delete = (req, res) => {
    Post.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "Post deleted",
                request: {
                    type: "POST",
                    url: "http://" + req.headers.host + "/posts/",
                    body: { title: "String", content: "String", deadline: "Date", priority: "String" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};