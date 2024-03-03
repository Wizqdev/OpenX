// Importing 
const express = require('express');

// Defining 
const router = express.Router();


// Routing
const ApiRouter = require('./Api')
router.use('/', ApiRouter);


// Exporting
module.exports = router;