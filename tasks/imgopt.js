"use strict";

var async = require('async');
var ImgOpt = require('lib/imgopt');

module.exports = function (grunt) {
  grunt.registerMultiTask('imgopt', 'Optimize PNG, JPEG, GIF images.', function() {
    var done = this.async();
    var options = this.options({
      progressive: true,
      interlace: true
    });
    
    async.forEach(this.files, function(file, next) {
      
    }, function(error) {
      if (error) {
        grunt.warn(error);
        done();
      }
    });
  });
};