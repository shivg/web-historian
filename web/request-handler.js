var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var httpHelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var reqPath = url.parse(req.url).pathname
  console.log("reqPath for .......", reqPath);
  reqPath = decodeURIComponent(reqPath);
  if (req.method === 'GET'){
    if(reqPath === "/"){
      reqPath="index.html";
      console.log("reqPath for ....... before serveasset", reqPath);
      res.end('/<input/')
      // httpHelper.serveAssets(res, reqPath);
    } else {
      httpHelper.serveAssets(res, reqPath);
    }

  } else if (req.method=== 'POST'){}
  //res.end(archive.paths.list);
};
