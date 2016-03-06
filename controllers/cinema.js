var crypto = require('crypto-js/md5');
var request = require('request');
var MovieDB = require('moviedb')('866913fcc5a950bed785551769c37f7c');
var async = require('async');

function ivaURL() {
  // TODO: make bash scripts to export variables at some point for secret values
  var secret = 'vnwjrhxowupaujpy';

  this.baseUrl = 'http://video.internetvideoarchive.net/video.mp4?';
  this.cmd = 'cmd=6'; //required,  6, alternative = 3.
  // kbitrate, MP4 – 80, 212, 450, 750, 1500, 2500(HD sources only) Kbps
  this.videoKbitrate = '&videokbrate=750'; // required, default 750
  this.publishId = '&publishedid='; // required, unique video id, 91
  this.customerId = '&customerid='; // required, 12345
  this.format = '&fmt=4'; //required, video format, default 4=mp4
  // Date when video expires, 1970 format,
  this.urlExpires = '&e=1457508799'; // required, default 1457508799, march 15th 2016
  this.hash = '&h='; //298y9386666

  this.setCmd = function(val) {
    this.cmd = 'cmd=' + val;
  };

  this.setVideoKbitrate = function(val) {
    this.videoKbitrate = 'videokbrate=' + val;
  };

  this.setPublishId = function(val) {
    this.publishId = 'publishedid=' + val;
  };

  this.setCustomerId = function(val) {
    this.customerId = 'customerId=' + val;
  };

  this.setFormat = function(val) {
    this.format = 'fmt=' + val;
  };

  this.setUrlExpires = function(val) {
    this.urlExpires = 'e=' + val;
  };


  this.outputUrl = function() {
    var url = this.baseUrl +
    this.customerId     + '&' +
    this.cmd            + '&' +
    this.format         + '&' +
    this.videoKbitrate  + '&' +
    this.publishId      + '&' +
    this.urlExpires;

    var hashedUrl = crypto(secret + url.toLowerCase());
    url += '&h=' + hashedUrl;

    return url;
  };
}

exports.getVideo = function(req, res) {
  var url = new ivaURL();
  url.setVideoKbitrate('750');
  // make a request for the id.
  url.setPublishId('33230');
  url.setCustomerId('995688');
  url.setFormat('4');
  url.setUrlExpires('1457508799');

      res.render('cinema', {
        title: 'Cinemality',
        url: url.outputUrl(),
        // info: info,
      });

  // request(options, callback);

//866913fcc5a950bed785551769c37f7c
// TMDb api key

};

exports.getMovie = function(req, res) {
  res.render('cinemaSearch', {

  });
};

exports.getKeywords = function(req, res) {
  res.render('keywords', {

  });
};

// idtype=68 for TMDb
exports.postKeywords = function(req, res) {
  var renderKeywords = [];
  var trailerLinks = [];
  var relatedKeywords = [];

  MovieDB.searchMovie({query: req.body.title }, function(err, result){
    if(err) console.log(err);
    // console.log(result.results[0].original_title);
    MovieDB.movieKeywords({id: result.results[0].id}, function(err, keywords) {
      // console.log(keywords.keywords);
      if(err) console.log(err);
      renderKeywords = keywords.keywords.slice();

      async.each(keywords.keywords,
        function(item, cb) {

          MovieDB.keywordMovies({ id: item.id }, function(err, moviesUnderKeyword) {
            if(err) console.log(err);
            // do ao thing with loops here
            // var url = 'https://ee.internetvideoarchive.net/api/expresspro/';
            // console.log(moviesUnderKeyword);
            // relatedKeywords = moviesUnderKeyword.slice();
            var url = 'https://ee.internetvideoarchive.net/api/expresspro/' + moviesUnderKeyword.results[0].id +
            '?idtype=1&appid=2c0bfc22';

            console.log('the url');
            console.log(url);
            var options = {
              // expresspro/1756?idtype=1&appid=12345.
              // url: 'http://api.internetvideoarchive.com/2.0/DataService/EntertainmentPrograms' + encodeURIComponent('()?$filter=substringof("Jurassic World",Title) and StreamLengthinseconds gt 0&$expand=MovieCategory, Description, ProgramToPerformerMaps/Performer, VideoAssets&format=json@developerid=105db639-eb8e-4cb0-b900-afb8ad519bb1'),
              // url: 'http://api.internetvideoarchive.com/2.0/DataService/EntertainmentPrograms',
              url: url,
              method: 'GET',
              headers: {
                'Content-Type': 'json',
                Authorization: 'Bearer ' + 'CRM2BrKREqDkoZUwYKhGG99QA2_d2vAi7flH9v8iaLVn5vpLpbag3vPfUbRetn-0w3qgSAEXP5fYOlf6i8tjuVk82zT5dqTsUn_1MTga6F-ithuTQGy0FQGhgkWNzPa20OyYsKFa_7Z8vb32zph7gWA5RcbENbnNbwzJiI4S8jUARgxKexj4Z28HCKDVONscjG606UgHpwWiIVWIMEP60Pkyf5_wB7VTyWgBjnJDudNNGhOtaod_YeIJhUv2o7eGeMuElTzbn7tvQZokNi4bpgEYeuQ',
                'X-Api-Version': '1'
              },
              // path: encodeURIComponent('()?$filter=substringof("Jurassic World",Title) and StreamLengthinseconds gt 0&$expand=MovieCategory, Description, ProgramToPerformerMaps/Performer, VideoAssets&format=json@developerid=105db639-eb8e-4cb0-b900-afb8ad519bb1'),
            };

            request(options, function callback(error, response, body) {
              if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                console.log('kILL ME ====================================');
                // console.log(info);

                cb()
              } else {
                console.log('error: ');
                console.log(error);

                cb()
              }
            });
          })
          // loop through keywords.keywords (list of keywords)
          // id/keyword pairs. example:
          // { id: 603, name: 'elves' },
          //  { id: 604, name: 'dwarves' },
          //  { id: 606, name: 'orcs' },
          //  { id: 609, name: 'middle-earth (tolkien)' },


          // afterwards search by keyword for a list of related movies
          // then get one movie from the array of listed movies
          // then get the id from the one movie per keyword
          // and find the related trailer
          // add the trailer URL to an array

        }, function done(){
          res.render('keywords', {
            result: relatedKeywords.results,
            keywords: renderKeywords,
            movieTitle: result.results[0].original_title,
          });
        });





        // console.log('related keywords');
        // console.log(relatedKeywords);
        // res.render('keywords', {
        //   result: relatedKeywords.results,
        //   keywords: renderKeywords,
        //   movieTitle: result.results[0].original_title,
    });
  });
};

exports.postMovie = function(req, res) {
  res.render('cinemaSearch', {
    qr: '/assets/qr_code.jpg',
    url_text: 'http://cinemality.com/1bdDlXc',
    play: 'Play'
  });

};

// rovi
// gracenote - meta info, TMS id from Grace note > search IVA; pinpoint api
