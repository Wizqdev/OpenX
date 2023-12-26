
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login'); 
    }
});

router.get('/', (req, res) => {
    const username = req.session.user ? req.session.user.username : null;
    res.render('dashboard', { username });
});

module.exports = router;
