const express = require("express");
const router = express.Router();
const axios = require('axios');

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

//GET/Download all images
router.get('/', async(req, res, next) => {
  try {
    const response = await s3.listObjectsV2({Bucket: BUCKET}).promise();
    const imagesArr = response.Contents;
    res.send(imagesArr);
  } catch(err) {
    console.log(next(err));
  }
});

//GET/Download single image
//CREATE/Upload single image
//DELETE single image



module.exports = router;