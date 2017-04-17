var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');
console.log(process.env.GITHUB_USER);
console.log(process.env.GITHUB_TOKEN);

//creat a folder to store the images
var mkdir = function () {
  try {
    fs.mkdir('avatars');
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}();

//repo owner and repo name from user
var repoOwner = process.argv[2];
var repoName = process.argv[3];

//if the repoOwner or repoName is undefined throw error
if(repoOwner == undefined){
  throw err;
}
if(repoName == undefined){
  throw err;
}

//
function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var requestURL = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function(err, response, body) {
    // if (err) throw err;
    console.log('Response Status Code:', response.statusCode);

    //store json body to results
    var results = JSON.parse(body);
    //loop through results and store into login and avatar
    results.forEach(function(value, index){

    var login = 'avatars/' + value.login + '.jpg';
    var avatar = value.avatar_url;

    //call function to input avatar and login information


    downloadImageByURL(avatar, login);
    });
  });
}

//downloads the image with url and filepath
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         //show what type of image
         .on('response', function (response) {
           console.log('Content Type: ', response.headers['content-type']);
         })
         //write file to avatars folder
         .pipe(fs.createWriteStream(filePath))
}

//call function to get the image
getRepoContributors(repoOwner, repoName, function(err, result) {

  console.log("Errors:", err);
  console.log("Result:", result);
});
