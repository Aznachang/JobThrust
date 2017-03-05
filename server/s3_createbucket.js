// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create S3 service object
s3 = new AWS.S3('uploaddata19920328');

// Create params for S3.createBucket
var bucketParams = {
  Bucket : process.argv[2],
  ACL : 'public-read'
};

s3.createBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
  }
});