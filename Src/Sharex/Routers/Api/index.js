// Importing 
const express = require('express');
const Token = require("../../../Scripts/Token")


// Defining
const router = express.Router();

<<<<<<< Updated upstream
router.use("/api", async (req, res, next) => {
    let isAdminRequest = false; // TODO: differentiate between admin and end user apis, maybe moving admin requests to its own path for easier differentiation
    if((req.session.user && req.session.user.authenticated) || req.path.startsWith("/login")) return next();
    else if(req.headers && req.headers.authorization && await Token.isTokenValid(req.headers.authorization, (isAdminRequest ? "Admin" : "User"))) {
        next();
    } else {
        return res.status(403).json({success: false, message: "No valid authorization provided"})
    }
})
=======
>>>>>>> Stashed changes

// Routing
const UploadRouter = require('./Upload')
router.use('/', UploadRouter);

const InfoRouter = require('./Info')
router.use('/', InfoRouter);

const LoginRouter = require('./Login')
router.use('/', LoginRouter);

const LogoutRouter = require('./Logout')
router.use('/', LogoutRouter);

const DashboardRouter = require('./Dashboard')
router.use('/', DashboardRouter);

const ViewRouter = require('./View')
router.use('/', ViewRouter);

const TokenRouter = require("./Token") 
router.use("/api/token", TokenRouter);

const UsersRouter = require("./Users") 
<<<<<<< Updated upstream
router.use("/api/users", UsersRouter);


=======
router.use("/api", UsersRouter);

router.use("/api", async (req, res, next) => {
    if((req.session.user && req.session.user.authenticated) || req.path.startsWith("/api/login")) return next(); 
    else if(req.headers && req.headers.authorization && Token.isTokenValid(req.headers.authorization)) {
        next();
    } else {
        return res.status(403).json({success: false, message: "No valid authorization provided"})
    }
}) 
>>>>>>> Stashed changes

// Exporting
module.exports = router;