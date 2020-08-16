'use strict';
const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const eachAsync = require('each-async');
const optimize = require('../lib/optimize');
const log = require('../lib/log');

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
        const optimizedBuffer = await optimize(originalBuffer, options);

        const originalBytes = originalBuffer.length;
        const optimizedBytes = optimizedBuffer.length;
        log(src, originalBytes, optimizedBytes);

        if (originalBytes - optimizedBytes > 0) {
          await writeFile(dest, optimizedBuffer);
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
