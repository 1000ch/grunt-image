# [grunt-image](https://npmjs.org/package/grunt-image)

Optimize PNG, JPEG, GIF, SVG images with grunt task.

[![Build Status](https://travis-ci.org/1000ch/grunt-image.svg?branch=master)](https://travis-ci.org/1000ch/grunt-image)
[![NPM version](https://badge.fury.io/js/grunt-image.svg)](http://badge.fury.io/js/grunt-image)
[![Dependency Status](https://david-dm.org/1000ch/grunt-image.svg)](https://david-dm.org/1000ch/grunt-image)
[![devDependency Status](https://david-dm.org/1000ch/grunt-image/dev-status.svg)](https://david-dm.org/1000ch/grunt-image?type=dev)

## Install

```bash
$ npm install --save-dev grunt-image
```

## Usage

This is an example of `gruntfile.js`.

```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    image: {
      static: {
        options: {
          optipng: false,
          pngquant: true,
          zopflipng: true,
          jpegRecompress: false,
          mozjpeg: true,
          guetzli: false,
          gifsicle: true,
          svgo: true
        },
        files: {
          'dist/img.png': 'src/img.png',
          'dist/img.jpg': 'src/img.jpg',
          'dist/img.gif': 'src/img.gif',
          'dist/img.svg': 'src/img.svg'
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-image');
};
```

You can configure parameters applied to each optimizers such as following:

```javascript
options: {
  optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
  pngquant: ['--speed=1', '--force', 256],
  zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
  jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
  mozjpeg: ['-optimize', '-progressive'],
  guetzli: ['--quality', 85],
  gifsicle: ['--optimize'],
  svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
}
```

## Result

![grunt-image result](https://raw.github.com/1000ch/grunt-image/master/screenshot/terminal.png)

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
