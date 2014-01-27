"use strict";

var fs = require('fs');
var path = require('path');

var async = require('async');
var chalk = require('chalk');
var ImgOpt = require('./lib/imgopt');

module.exports = function (grunt) {
  grunt.registerMultiTask('imgopt', 'Optimize PNG, JPEG, GIF images.', function() {
    var done = this.async();
    var options = this.options({
      progressive: true,
      interlace: true
    });
    var totalSavedSize = 0;
    
    async.forEach(this.files, function (file, next) {
      var imgopt = new ImgOpt({
        src: file.src[0],
        dest: file.dest,
        options: options
      });

      imgopt.optimize(function (error, data) {
        if (error) {
          grunt.warn(error);
        }
        
        var message = '';
        totalSavedSize += data.diff;

        if (data.diffSizeRaw < 10) {
          message = 'already optimized';
        } else {
          message = 'saved ' + data.diffSizeRaw;
        }

        grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + message + ')'));
        process.nextTick(next);
      });
    }, function (error) {
      if (error) {
        grunt.warn(error);
        done();
      }
    });
  });
};