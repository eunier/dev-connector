const express = require('express');
const router = express.Router();
const log = require('../../icon-log/icon-log');

// @route   GET /api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
  log.info('GET /api/posts/test');
  res.json({ msg: 'posts porks' });
});

module.exports = router;
