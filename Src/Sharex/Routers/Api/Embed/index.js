// Importing
const express = require('express');
const Embed = require("../../../../Scripts/Embed")

// Defining
const router = express.Router();

const config = require("../../../../../config.json");
/*\
title: {type: String, required: true},
    color: {type: String, required: true},
    description: {type: String, required: true},
    footer: {type: String, required: true}
*/
router.post("/edit", async (req, res) => {
  console.log("a")
  if(!(req.body && req.body.title && req.body.color && req.body.description && req.body.footer)) return res.status(400).json({success: false, message: "All fields not there"})
  let {userid, title, color, description, footer} = req.body;
  await Embed.setEmbedSettings(userid, title, color, description, footer)
  res.status(200).json({success: true, message: "Embed data saved"});
});

// Exporting
module.exports = router;