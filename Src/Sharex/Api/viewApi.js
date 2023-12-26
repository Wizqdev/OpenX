const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const mediaFolder = path.join(__dirname, '../../../Uploads');

router.get('/media', async (req, res) => {
  try {
    const mediaFiles = await getAllMediaFiles(mediaFolder);
    res.json(mediaFiles);
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

module.exports = router;
