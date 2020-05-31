'use strict';

const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const eachAsync = require('each-async');
const chalk = require('chalk');
const filesize = require('filesize');
const {round10} = require('round10');
const optimize = require('../lib/optimize');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = function (grunt) {
  grunt.registerMultiTask('image', 'Optimize PNG, JPEG, GIF, SVG images.', function () {
    const done = this.async();
    const options = this.options({
      optipng: false,
      pngquant: true,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    });

    eachAsync(this.files, async (file, index, next) => {
      const src = file.src[0];
      const {dest} = file;

      try {
        // Make directory if does not exist
        mkdirp.sync(path.dirname(dest));

        const originalBuffer = await readFile(src);
        const originalSize = originalBuffer.length;
        const optimizedBuffer = await optimize(originalBuffer, options);
        const optimizedSize = optimizedBuffer.length;

        const diffSize = originalSize - optimizedSize;
        const diffPercent = round10(100 * (diffSize / originalSize), -1);

        if (diffSize <= 0) {
          grunt.log.writeln(
            chalk.green('- ') + file.src + chalk.gray(' ->') +
            chalk.gray(' Cannot improve upon ') + chalk.cyan(filesize(originalSize))
          );
        } else {
          await writeFile(dest, optimizedBuffer);

          grunt.log.writeln(
            chalk.green('✔ ') + file.src + chalk.gray(' ->') +
              chalk.gray(' before=') + chalk.yellow(filesize(originalSize)) +
              chalk.gray(' after=') + chalk.cyan(filesize(optimizedSize)) +
              chalk.gray(' reduced=') + chalk.green.underline(filesize(diffSize) + '(' + diffPercent + '%)')
          );
        }

        next();
      } catch (error) {
        grunt.warn(error);
        next(error);
      }
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
