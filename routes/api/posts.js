const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const log = require('../../icon-log/icon-log');

// models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// validation
const validatePostInput = require('../../validation/post');

// @route   GET /api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
  log.info('GET /api/posts/test');
  res.json({ msg: 'posts works' });
});

// @route   GET /api/posts
// @desc    Get post
// @access  Public
router.get('/', (req, res) => {
  log.info('GET /api/posts');

  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET /api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  log.info('GET /api/posts/:id');

  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post foudn with that ID' })
    );
});

// @route   POST /api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info('POST /api/posts', req.body.text);
    const { errors, isValid } = validatePostInput(req.body);

    // check Validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info('DELETE /api/posts/:id');

    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ otauthorized: 'User not authorized' });
          }

          // delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info('POST api/posts/like/:id');

    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // if user already liked the post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // add user it to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

module.exports = router;
