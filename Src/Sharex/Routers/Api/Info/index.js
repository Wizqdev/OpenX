// Importing
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const util = require('util');

// Defining
const router = express.Router();

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

// Locating Upload Files Path
const folderPath = path.join(__dirname, '../../../../../Uploads');

router.get('/api/file-count', async (req, res) => {
  try {
    const numberOfFiles = await countFiles(folderPath);
    res.json({ numberOfFiles });
  } catch (error) {
    console.error('Error Reading Directory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/api/space-used', async (req, res) => {
  try {
    const stats = await getFilesStatsRecursively(folderPath);
    let spaceUsed = 0;
    stats.forEach(stat => {
      spaceUsed += stat.size
    });
    let spaceUsedFormatted = formatBytes(spaceUsed);
    res.json({ spaceUsedFormatted, spaceUsed });
  } catch (error) {
    console.error('Error Reading Directory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function For Converting 
function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round((bytes / Math.pow(1024, i))) + ' ' + sizes[i];
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round((bytes / Math.pow(1024, i))) + ' ' + sizes[i];
}

async function countFiles(directory) {
  return (await getFilesStatsRecursively(directory)).length
}

async function getFilesStatsRecursively(directory) {
  const files = await fs.readdir(directory);
  let filesList = [];
  for(let file of files) {
    let fileStats = await fs.stat(`${directory}/${file}`);
    if(fileStats.isDirectory()) filesList.push(...(await getFilesStatsRecursively(`${directory}/${file}`)));
    else {
      filesList.push(fileStats)
    }
  }
  return filesList
}

// Exporting
module.exports = router;
