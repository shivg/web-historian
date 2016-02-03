var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var httpHelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

var method = req.method;
var receivedURL = req.url;
// parsing the URL path name google.com / --> after here
var reqPath = url.parse(receivedURL).pathname;
reqPath = decodeURIComponent(reqPath);

// console.log("reqPath for .......  :", reqPath);
// console.log(method,'  Method..........................');
var actions = {
  'GET': function (req, res) {
    if(reqPath === "/"){
      reqPath = "index.html";
      console.log("reqPath for ....... before serveasset", reqPath);
      res.end('/<input/');
      // httpHelper.serveAssets(res, reqPath);
    } else {
      httpHelper.serveAssets(res, reqPath);
    }
  },
  'POST': function (req, res) {
    httpHelper.handlePostRequest(req,res);
  },
  'OPTIONS': function (req, res) {

  }
};

  
  if ( actions[method] ){
    actions[method](req, res);
  }
  //res.end(archive.paths.list);

};
