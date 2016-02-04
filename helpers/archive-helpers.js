var fs = require('fs');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  // reading sites.text, and calling callback with the read data
  fs.readFile(this.paths.list, 'utf8', function (err, data) {
    // split by the \n new line escape
    var readFile = data.split('\n');
    // if this file exist
    if(readFile){
      // callback
      return cb(readFile);
    }
  });
    

};

exports.isUrlInList = function(urlTarget , cb) {

  var isItThere = false;
  exports.readListOfUrls(function (data) {
    if ( data.indexOf(urlTarget) > -1) {
      isItThere = true;
    }
  });
  cb ? cb(isItThere) : void 0;
};

exports.addUrlToList = function(urlToAdd, cb) {
  fs.appendFile(this.paths.list, urlToAdd , function (err) {
      console.log('Got an error while appending: ', err);
    });
  // check if callback if exist, if it does, invoke it, otherwise do nothing.
  cb ? cb() : void 0;
};

exports.isUrlArchived = function(urlToCheckArchive, cb) {
    var pathtoCheck = this.paths.archivedSites+'/'+urlToCheckArchive;
    // check if the path exist, returns true or false
    fs.exists(pathtoCheck, function (exists)  {
      //Run the callback with the boolean
      cb(exists);
    });
};

exports.downloadUrls = function(urlArray) {
  console.log('urlArrayurlArrayurlArrayurlArrayurlArrayurlArray', urlArray)
  var http = require("http");
  var that = this;
  // var fileNamesArray = [];
  // exports.readListOfUrls(function (fileNameList) {
   
    urlArray.forEach(function (urlToFetch) {
      console.log('urlToFetchurlToFetchurlToFetchurlToFetchurlToFetch', urlToFetch)
      var options = {
        hostname: urlToFetch,
        method: "GET",
        path:"/",
        headers: {Accept: "text/html"}
      };

      var responseData = "";

      var request = http.request(options, function(response) {

          response.setEncoding('utf8');
          response.on('data', function (chunk) {
            responseData+=chunk.toString();
          });
          
          response.on('end', function () {
            var urltoStore = that.paths.archivedSites+"/"+urlToFetch;
            exports.isUrlArchived(urltoStore, function (exist) {
              if (!exist) {
                  fs.writeFile(urltoStore, responseData, function (err) {
                if (err) console.log(err)
                  else console.log('File stored')
                });
              }
            });
          });
      
      });
      
      // function fetchData (n) {
      //   if(n<urlArray.length) {
      //     fetchAndStore( urlArray[n], function(err) {
      //           if( err ) {
      //             console.log('error: '+err)
      //           }
      //           else {
      //             fetchData(i+1);
      //           }
      //     }
      // }
      // }

      request.end();
    });
  // });
};
