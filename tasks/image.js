"use strict";

var fs = require('fs');
var path = require('path');

var async = require('async');
var chalk = require('chalk');
var Optimizer = require('./lib/optimizer');

module.exports = function (grunt) {
  grunt.registerMultiTask('image', 'Optimize PNG, JPEG, GIF images.', function() {
    var done = this.async();
    var options = this.options({
      progressive: true,
      interlace: true
    });

    async.eachLimit(this.files, 10, function (file, next) {
      var basename = path.basename(file.dest);
      var dir = file.dest.replace(basename, '');
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      
      var optimizer = new Optimizer({
        src: file.src[0],
        dest: file.dest,
        options: options
      });

      optimizer.optimize(function (error, data) {
        if (error) {
          grunt.warn(error);
        }
        grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + data.diff + ' reduced)'));
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
