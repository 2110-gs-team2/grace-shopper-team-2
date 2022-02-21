const express = require("express");
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');


//images located on s3/AWS server
const aws = require('aws-sdk');
require('dotenv').config();

//AWS config(credentials)
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION
});

//s3 init
const s3 = new aws.S3();
const BUCKET = process.env.BUCKET;

//multer middleware/library for uploading images to s3
const upload = multer({
  storage: multerS3({
    s3: s3,
    // acl: "public-read",
    bucket: BUCKET,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname)
    }
  })
});

//CREATE/Upload single image
router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    res.send('Successfully uploaded ' + req.file.location + ' location!')
  }catch(err) {
    console.log('s3 Upload error-->', next(err));
  }
});

//GET all image data
router.get('/', async(req, res, next) => {
  try {
    const response = await s3.listObjectsV2({Bucket: BUCKET}).promise();
    const imagesArr = response.Contents;
    res.send(imagesArr);
  } catch(err) {
    console.log(next(err));
  }
});

//DELETE single image
router.delete('/delete/:filename', async(req, res, next) => {
  try {
    const fileName = req.params.filename;
    await s3.deleteObject({Bucket: BUCKET, Key: fileName }).promise();
    res.send('File Deleted Successfully');
  }catch(err) {
    console.log('s3 delete error-->', next(err));
  }
});

//GET/Download single image
router.get('/download/:filename', async(req, res, next) => {
  try {
    const fileName = req.params.filename;
    const obj = await s3.getObject({ Bucket: BUCKET, Key: fileName }).promise();
    res.send(obj.Body);
  } catch(err) {
    console.log('s3 get error-->', next(err));
  }
});


module.exports = router;