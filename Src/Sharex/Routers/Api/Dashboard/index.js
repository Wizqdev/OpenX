// Importing
const express = require('express');

// Defining
const router = express.Router();


router.use((req, res, next) => {
    if(req.path.startsWith("/dashboard") && !req.session.user && !req.path.startsWith("/login")) {
        res.redirect('/login');
    } else {
        next();
    }
}); 


router.get('/dashboard', (req, res) => { 
    const username = req.session.user ? req.session.user.username : null;
    res.render('dashboard', { username });
});

// Exporting
module.exports = router;