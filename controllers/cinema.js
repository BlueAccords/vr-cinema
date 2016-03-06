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
  MovieDB.searchMovie({query: req.body.title }, function(err, result){
    if(err)
    console.log(result.results[0].original_title);
    MovieDB.movieKeywords({id: result.results[0].id}, function(err, keywords) {
      // console.log(keywords.keywords);
      renderKeywords = keywords.keywords.slice();
      MovieDB.keywordMovies({id: keywords.keywords[0].id}, function(err, relatedKeywords) {

        // do ao thing with loops here
        var url = 'https://ee.internetvideoarchive.net/api/expresspro/';

        console.log('the url');
        console.log(url);
        var options = {
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
            console.log(info[0]);
            res.render('cinemaSearch', {
              title: 'Cinemality',
              info: info[0],
            });
          } else {
            console.log('error: ');
            console.log(error);
            res.render('cinemaSearch', {
              title: 'Cinemality',
              error: error,
              response: response,
              body: body
            });
          }
        });


        // console.log('related keywords');
        // console.log(relatedKeywords);
        // res.render('keywords', {
        //   result: relatedKeywords.results,
        //   keywords: renderKeywords,
        //   movieTitle: result.results[0].original_title,
        // });
      });
    });
  });
};

exports.postMovie = function(req, res) {
  console.log('awefwafawfwe');
  // $.ajax({
  //   dataType: "json",
  //   headers: {
  //     Authorization: 'Bearer ' + 'CRM2BrKREqDkoZUwYKhGG99QA2_d2vAi7flH9v8iaLVn5vpLpbag3vPfUbRetn-0w3qgSAEXP5fYOlf6i8tjuVk82zT5dqTsUn_1MTga6F-ithuTQGy0FQGhgkWNzPa20OyYsKFa_7Z8vb32zph7gWA5RcbENbnNbwzJiI4S8jUARgxKexj4Z28HCKDVONscjG606UgHpwWiIVWIMEP60Pkyf5_wB7VTyWgBjnJDudNNGhOtaod_YeIJhUv2o7eGeMuElTzbn7tvQZokNi4bpgEYeuQ',
  //    'X-Api-Version': '1'
  //   },
  //   url: 'https://ee.internetvideoarchive.net/api/expresspro/actions/search/',
  var url = 'https://ee.internetvideoarchive.net/api/expresspro/actions/search/?appid=2c0bfc22&term=' + encodeURIComponent(req.body.title);

  console.log('the url');
  console.log(url);
  var options = {
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
      console.log(info[0]);
      res.render('cinemaSearch', {
        title: 'Cinemality',
        info: info[0],
      });
    } else {
      console.log('error: ');
      console.log(error);
      res.render('cinemaSearch', {
        title: 'Cinemality',
        error: error,
        response: response,
        body: body
      });
    }
  });

};

// rovi
// gracenote - meta info, TMS id from Grace note > search IVA; pinpoint api
