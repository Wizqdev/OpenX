const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    res.json({ success: true, redirect: '/login' });
  });
});

module.exports = router;
