var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'davidjinuk';
var GITHUB_TOKEN = '908e91f9130a91e1e46d2bebc080511c9c3560a1';

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function(err, response, body) {
    if (err) throw err;
    console.log('Response Status Code:', response.statusCode);

    var results = JSON.parse(body);
    results.forEach(function(value, index){
      var login = value.login;
      var avatar = value.avatar_url;

      console.log(login);
      console.log(avatar);
    });
  });
}

function downloadImageByURL(url, filePath) {
  // ...
  var fs = require('fs');
  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Response Status Code: ', response.statusCode);
           console.log('Response Status Message: ', response.statusMessage);
           console.log('Content Type: ', response.headers['content-type']);
           console.log('Downloading image...');
         })
         .pipe(fs.createWriteStream(filePath))

         .on('finish', function () {
            console.log('Download Complete');
         });
}
downloadImageByURL('https://avatars.githubusercontent.com/u/1615?v=3', './jeresig.jpg');

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

