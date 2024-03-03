// Importing
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const randomstring = require('randomstring');
const Token = require("../../../../Scripts/Token")
const {getFileType} = require("../../../../Utils/fileutil.js")
const Upload = require("../../../../Scripts/Upload")

// Defining
const router = express.Router();

const config = require("../../../../../config.json");
const domain = config.Web.Domain
const fileNameLength = config.fileNameLength || 8;

const allowedFileTypes = config.allowedFileTypes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = getFileType(file.originalname);
    const uploadDir = `Uploads/${fileType}`;
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const randomStr = randomstring.generate(fileNameLength);
    cb(null, `${randomStr}${path.extname(file.originalname)}`);
  }
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
  fileFilter: fileFilter
}).single('file'); 

router.use('/uploads', express.static('uploads'));

router.post('/api/upload', (req, res) => {
   
  if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ") || !Token.isTokenValid(req.headers.authorization.replace("Bearer ", ""), "User")) {
    return res.status(403).json({success: false, message: "Invalid auth token! Re-download your config from the dashboard!"})
  }
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    let fileType = getFileType(req.file.originalname);
    let user = await Token.getUserFromToken(req.headers.authorization)

    await Upload.createUpload(path.basename(req.file.path), fileType, user, req.file.size)
    
    
    const viewURL = `${domain}/i/${path.basename(req.file.path)}`;
    res.status(200).json({ success: true, filePath: viewURL });
  });
});

// Exporting
module.exports = router;