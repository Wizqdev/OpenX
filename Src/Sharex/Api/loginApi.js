const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const config = require('../../../config.json');

router.use(
  session({
    secret: config.Web.Secret,
    resave: false,
    saveUninitialized: true,
  })
);

router.use(bodyParser.json());


router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username == config.Admin.Username && password == config.Admin.Password) {
    req.session.user = req.session.user || {};
    req.session.user.authenticated = true;
    req.session.user.username = username;
    res.json({ success: true, redirect: '/dashboard' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Username or Password' });
  }
});

module.exports = router;
