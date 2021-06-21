const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    id: 1, content: 'test1'
  });
});

module.exports = router;