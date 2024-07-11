// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/public/uploads/'));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

// Configure Multer to accept specific fields
const upload = multer({ storage: storage }).fields([
  { name: 'idFrontImage', maxCount: 1 },
  { name: 'idBackImage', maxCount: 1 },
  { name: 'busImage', maxCount: 1 }
]);

// POST endpoint for uploading multiple files
router.post('/', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(400).json({ error: err });
    }

    // Everything went fine, return the file paths
    const filePaths = {};
    if (req.files['idFrontImage']) {
      filePaths.idFrontImage = `/uploads/${req.files['idFrontImage'][0].filename}`;
    }
    if (req.files['idBackImage']) {
      filePaths.idBackImage = `/uploads/${req.files['idBackImage'][0].filename}`;
    }
    if (req.files['busImage']) {
      filePaths.busImage = `/uploads/${req.files['busImage'][0].filename}`;
    }
    res.status(200).json(filePaths);
  });
});

module.exports = router;
