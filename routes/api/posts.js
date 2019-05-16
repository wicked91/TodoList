const express = require("express");
const router = express.Router();
const Post = require('../../models/Post');

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @desc    Create post
router.post('/', (req, res) => {

      const newPost = new Post({
        title: req.body.title,
        content : req.body.content,
        duedate : req.body.duedate,
        priority : req.body.priority
      });
  
      newPost.save()
        .then(post => res.json(post));
    }
  );

// @desc    Get posts
router.get('/all', (req, res) => {
    Post.find()
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });

// @desc   Update post
router.post('/edit', (req, res)=>{
    const postFields = {};
    if (req.body.id) postFields.id = req.body.id;
    if (req.body.title) postFields.title = req.body.title;
    if (req.body.content) postFields.content = req.body.content;
    if (req.body.duedate) postFields.duedate = req.body.duedate;
    if (req.body.priority) postFields.priority = req.body.priority;

    Post.findById({ _id: req.body.id })
      .then(result => {
        if(result) {
          Post.findOneAndUpdate(
            {_id : req.body.id},
            { $set: postFields },
            { new: true }
          )
          .then(() => {
            Post.find()
            .then(posts => res.json(posts))
            .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
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
router.get('/toggle/:id', (req, res) =>{
  Post.findById({_id : req.params.id})
    .then(result => {
      if(result) {
        const next = !result.complete;
        console.log(next);
        Post.findOneAndUpdate(
          {_id : req.params.id},
          {'complete' : next},
          { new: true }
        )
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
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
        .catch(err => res.status(404).json({ message : 'No post found' }));
    }
  );

module.exports = router;