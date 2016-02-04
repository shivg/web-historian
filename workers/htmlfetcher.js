// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// this is worker, searches the site, then stores the each url in the sites.txt in the sites folders, 

// require the archive-helpers
var archive = require('../helpers/archive-helpers');

require('crontab').load(function(err, crontab) {
  
var job = crontab.create('node '+__dirname+'/htmlfetcher.js' , '* * * * *');
console.log('jobjobjobjobjobjobjobjobjob', job)
crontab.save();
});


// go through the url arrays.
archive.readListOfUrls(function (readUrls) {
 archive.downloadUrls(readUrls); 
});