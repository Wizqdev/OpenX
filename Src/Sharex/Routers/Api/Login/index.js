// Importing
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('../../../../../config.json');
const User = require("../../../../Scripts/User") 

// Defining 
const router = express.Router();


router.use(
  session({ 
    secret: config.Web.Secret,
    resave: false,
    saveUninitialized: true,
  })
);

router.use(bodyParser.json());


router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  let userIsValid = false;
  await User.verifyPassword(username, password).then((isValid) => userIsValid = isValid).catch(() => {})
  if (userIsValid) {
    let user = await User.getUserByName(username)
    req.session.user = req.session.user || {};
    req.session.user.authenticated = true;
    req.session.user.userid = user.userid
    req.session.user.username = username;
    req.session.user.isAdmin = user.isAdmin;
    res.json({ success: true, redirect: '/dashboard' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Username or Password' });
  }
});

// Exporting
module.exports = router;