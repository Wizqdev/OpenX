// Importing
const express = require('express');

// Defining
const router = express.Router();

router.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    res.json({ success: true, redirect: '/login' });
  });
});

// Exporting
module.exports = router;