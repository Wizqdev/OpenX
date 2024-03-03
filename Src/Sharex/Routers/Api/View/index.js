// Importing
const express = require('express');
const path = require('path');
const fs = require('fs').promises; 
const Uploads = require("../../../../Scripts/Upload");
const Token = require("../../../../Scripts/Token");

// Defining 
const router = express.Router();


// Locating Upload Files Path
const mediaFolder = path.join(__dirname, '../../../../../Uploads');

router.get('/api/media', async (req, res) => {
  try {
    const mediaFiles = await getAllMediaFiles(mediaFolder);
    res.json(mediaFiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/media/:userid', async (req, res) => {
  try {
    let token = req.headers.authorization.replace("Bearer ", "");
    let isAdmin = (req.session && req.session.isAdmin) || await Token.isTokenValid(token, "Admin");
    let accessToId = (req.session && req.session.userid) || await Token.getUserFromToken(token); 
    if(!isAdmin && accessToId != req.params.userid) {
      res.sendStatus(403);
    } else {
      const mediaFiles = await Uploads.getUploadsByUserId(req.params.userid);
      if(mediaFiles.length === 0) {
        res.json({error: "No uploads found for user"}) //brb ig
      } else {
        res.json({mediaFiles});
      }
    }
     
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } 
});

async function getAllMediaFiles(directory) {
  const files = await readFilesFromDirectory(directory);
  return files.filter(file => /\.(png|jpe?g|gif|mp4)$/i.test(file));
}

async function readFilesFromDirectory(directory) {
  const dirents = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const dirent of dirents) {
    const fullPath = path.join(directory, dirent.name);

    if (dirent.isDirectory()) {
      const subdirectoryFiles = await readFilesFromDirectory(fullPath);
      files.push(...subdirectoryFiles);
    } else {
      files.push(fullPath);
    }
  }
  let returner = []
  for(let file of files) {
    returner.push(path.basename(file));
  }

  return returner;
}

// Exporting
module.exports = router;
