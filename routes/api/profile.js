const express = require('express');
const router = express.Router();

// @route   GET /apt/profile/test
// @desc    test profile route
// @access  Public
router.get('/test', (req, res) => {
  res.json({msg: "profile works"});
});

module.exports = router;