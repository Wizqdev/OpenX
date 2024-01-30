// Importing 
const express = require('express');
//fuck no u doing that :skull: i am just gonna make the embed bits work for now lol
    // well wana make the files good? again instead of index.js :skull: 
// Defining 
const router = express.Router();


// Routing
const ApiRouter = require('./Api')
router.use('/', ApiRouter);


// Exporting
module.exports = router;