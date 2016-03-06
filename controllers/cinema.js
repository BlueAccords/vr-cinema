var crypto = require('crypto-js/md5');
var request = require('request');

function ivaURL() {
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
    this.cmd            + '&' +
    this.videoKbitrate  + '&' +
    this.publishId      + '&' +
    this.customerId     + '&' +
    this.format         + '&' +
    this.urlExpires;

    var hashedUrl = crypto(url.toLowerCase());
    url += '&h=' + hashedUrl;

    return url;
  };
}

exports.getMovie = function(req, res) {
  var url = new ivaURL();
  url.setVideoKbitrate('750');
  // make a request for the id.
  url.setPublishId('33230');
  url.setCustomerId('995688');
  url.setFormat('4');
  url.setUrlExpires('1457508799');

  // $.ajax({
  //   dataType: "json",
  //   headers: {
  //     Authorization: 'Bearer ' + 'CRM2BrKREqDkoZUwYKhGG99QA2_d2vAi7flH9v8iaLVn5vpLpbag3vPfUbRetn-0w3qgSAEXP5fYOlf6i8tjuVk82zT5dqTsUn_1MTga6F-ithuTQGy0FQGhgkWNzPa20OyYsKFa_7Z8vb32zph7gWA5RcbENbnNbwzJiI4S8jUARgxKexj4Z28HCKDVONscjG606UgHpwWiIVWIMEP60Pkyf5_wB7VTyWgBjnJDudNNGhOtaod_YeIJhUv2o7eGeMuElTzbn7tvQZokNi4bpgEYeuQ',
  //    'X-Api-Version': '1'
  //   },
  //   url: 'https://ee.internetvideoarchive.net/api/expresspro/actions/search/',


  var options = {
    url: url.outputUrl(),
    headers: {
      'User-Agent': 'request'
    },
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
      res.render('cinema', {
        title: 'Cinemality',
        url: url,
        info: info,
      });
    }
  }

  request(options, callback);



};
