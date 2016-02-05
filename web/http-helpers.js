var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
console.log(asset);
 // if (asset === '/www.google.com'){res.end('google')} else {
  if (asset === "/") asset = './public/index.html';
  console.log(asset,"inside servvservvservvservvservvservv");
  fs.readFile(asset, 'utf8', function (err, data) {
    if (err) {
      console.log(err,'err');
      fs.readFile('./public/loading.html', 'utf8', function (err, data) {
        res.writeHead(200, headers);
        res.end(data);
      });
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  });
//}
};

exports.handlePostRequest = function (req, res) {
 
  var buildRequest = "";
  var fileName = archive.paths.list;
// Getting the url data from the client request
  req.on('data', function (data) {
            buildRequest += data.toString();
        });

// Append it to sites.txt and send 302 response back to client
  req.on('end', function (data) {
    var parsedURL = buildRequest.split("=")[1];

    archive.addUrlToList(parsedURL);
    headers['Location'] = "/"+parsedURL;
    res.writeHead(302, headers);
    res.end();       
    });

};


// As you progress, keep thinking about what helper functions you can put here!
