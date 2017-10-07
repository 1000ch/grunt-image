"use strict";

const fs = require('fs');
const path = require('path');
const pify = require('pify');
const fsP = pify(fs);
const mkdirp = require('mkdirp');
const eachAsync = require('each-async');
const chalk = require('chalk');
const filesize = require('filesize');
const optimize = require('../lib/optimize');
const round10 = require('../lib/round10');

module.exports = function (grunt) {
  grunt.registerMultiTask('image', 'Optimize PNG, JPEG, GIF, SVG images.', function () {
    const done = this.async();
    const options = this.options({
      optipng: false,
      pngquant: true,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true
    });

    eachAsync(this.files, (file, index, next) => {
      const src = file.src[0];
      const dest = file.dest;

      // make directory if does not exist
      mkdirp.sync(path.dirname(dest));

      fsP.readFile(src)
        .then(buffer => optimize(buffer, options))
        .then(buffer => {
          let original = fs.statSync(src).size;
          let diff = original - buffer.length;
          let diffPercent = round10(100 * (diff / original), -1);

          if (diff <= 0) {
            return fsP.readFile(src)
              .then(buffer => fsP.writeFile(dest, buffer))
              .then(() => {
                grunt.log.writeln(
                  chalk.green('- ') + file.src + chalk.gray(' ->') +
                  chalk.gray(' Cannot improve upon ') + chalk.cyan(filesize(original))
                );
              });
          } else {
            return fsP.writeFile(dest, buffer)
              .then(() => {
                grunt.log.writeln(
                  chalk.green('✔ ') + file.src + chalk.gray(' ->') +
                  chalk.gray(' before=') + chalk.yellow(filesize(original)) +
                  chalk.gray(' after=') + chalk.cyan(filesize(buffer.length)) +
                  chalk.gray(' reduced=') + chalk.green.underline(filesize(diff) + '(' + diffPercent + '%)')
                );
              });
          }
        })
        .then(() => next())
        .catch(error => {
          grunt.warn(error);
          next(error);
        });
    }, error => {
      if (error) {
        grunt.warn(error);
        done(error);
      } else {
        done();
      }
    });
  });
};
