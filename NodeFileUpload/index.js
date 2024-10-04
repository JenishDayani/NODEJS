const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const filename = path.parse(file.originalname).name;
      const extension = path.parse(file.originalname).ext;
      cb(null, `${filename}-${Date.now()}${extension}`);
    },
  }),
}).single('user_file');

app.post('/upload', upload, (req, res) => {
  res.send('File uploaded Successfully');
});

app.listen(5000);
