const express = require("express");
const router = express.Router();
const Post = require('../../models/Post');

const validateInput = require('../../validation/post');

// @desc    Create post
router.post('/', (req, res) => {

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

  newPost.save()
    .then(post => res.json(post));
}
);

// @desc    Get posts
router.get('/all', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => 
      res.status(404).json(
        { message : 'No posts found' }
      ));
});

// @desc   Update post
router.post('/edit', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const postFields = {};
  if (req.body.id) postFields.id = req.body.id;
  if (req.body.title) postFields.title = req.body.title;
  if (req.body.content) postFields.content = req.body.content;
  if (req.body.deadline) postFields.duedate = req.body.deadline;
  if (req.body.priority) postFields.priority = req.body.priority;

  Post.findById({ _id: req.body.id })
    .then(result => {
      if (result) {
        Post.findOneAndUpdate(
          { _id: req.body.id },
          { $set: postFields },
          { new: true }
        )
          .then(() => {
            Post.find()
              .then(posts => res.json(posts))
              .catch(err => res.status(404).json({ message: 'No posts found' }));
          })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @desc    toggleUpdate get
router.get('/toggle/:id', (req, res) => {
  Post.findById({ _id: req.params.id })
    .then(result => {
      if (result) {
        const toggle = !result.finish;
      
        Post.findOneAndUpdate(
          { _id: req.params.id },
          { 'finish': toggle },
          { new: true }
        )
          .then(post => res.json(post))
          .catch(err => res.status(404).json({ message: 'No posts found' }));
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @desc    Delete post
router.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.remove()
        .then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ message: 'No post found' }));
}
);

module.exports = router;