const express = require("express");
const router = express.Router();
const PostContoller = require('../controller/posts');

// @desc    Create post
router.post('/', PostContoller.create_post);

// @desc    Get posts
router.get('/', PostContoller.get_posts_all);

// @desc    Get post
router.get('/:id', PostContoller.get_post);

// @desc   Update post
router.post('/edit', PostContoller.post_edit);

// @desc    toggleUpdate get
router.get('/toggle/:id', PostContoller.post_toggle);

// @desc    Delete post
router.delete('/:id', PostContoller.post_delete);

module.exports = router;