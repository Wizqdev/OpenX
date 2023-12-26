const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const randomstring = require('randomstring');
const { getFileType } = require('../../Utils/fileutil.js');

const router = express.Router();

const config = require('../../../config.json');
const domain = config.Web.Domain;
const fileNameLength = config.fileNameLength || 8;

const allowedFileTypes = config.allowedFileTypes;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = getFileType(file.originalname);
    const uploadDir = `Uploads/${fileType.charAt(0).toUpperCase()}${fileType.slice(1).toLowerCase()}`;
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const randomStr = randomstring.generate(fileNameLength);
    cb(null, `${randomStr}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = getFileType(file.originalname);
  if (allowedFileTypes[fileType] && allowedFileTypes[fileType].includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Invalid File Type'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: config.maxUploadSize,
  fileFilter: fileFilter,
}).single('file');

router.use('/uploads', express.static('uploads'));

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    const viewURL = `${domain}/i/${path.basename(req.file.path)}`;
    res.status(200).json({ success: true, filePath: viewURL });
  });
});

module.exports = router;
