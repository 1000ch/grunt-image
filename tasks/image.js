"use strict";

var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
var chalk = require('chalk');
var filesize = require('filesize');

var Optimizer = require('./optimizer');

module.exports = function (grunt) {
  grunt.registerMultiTask('image', 'Optimize PNG, JPEG, GIF, SVG images.', function() {

    var done = this.async();
    var options = this.options({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    });

    async.eachLimit(this.files, 10, function (file, next) {

      var src = file.src[0];
      var dest = file.dest;

      // make directory if does not exist
      mkdirp.sync(path.dirname(dest));

      var optimizer = new Optimizer({
        src: src,
        dest: dest,
        options: options
      });

      optimizer.optimize(function (error, data) {

        if (error) {
          grunt.warn(error);
          return next(error);
        }

        if (data.isOptimized) {
          grunt.log.writeln(
            chalk.green('✔ ') + src + chalk.gray(' ->') +
            chalk.gray(' before=') + chalk.yellow(filesize(data.originalSize)) +
            chalk.gray(' after=') + chalk.cyan(filesize(data.optimizedSize)) +
            chalk.gray(' reduced=') + chalk.green.underline(filesize(data.diffSize) + '(' + data.diffPercent + '%)')
          );
        } else {
          grunt.log.writeln(
            chalk.cyan('✗ ') + src + chalk.gray(' is not optimized') +
            chalk.gray(' before=after=') + chalk.cyan(filesize(data.originalSize)) +
            chalk.gray(' reduced=') + chalk.green.underline(filesize(0) + '(0%)')
          );
        }

        next();
      });
    }, function (error) {
      if (error) {
        grunt.warn(error);
        return done(error);
      }
      done();
    });
  });
};
