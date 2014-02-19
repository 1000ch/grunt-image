# [grunt-image](https://npmjs.org/package/grunt-image)

## About

Optimize PNG, JPEG, GIF images with grunt task.

[![Build Status](https://travis-ci.org/1000ch/grunt-image.png?branch=master)](https://travis-ci.org/1000ch/grunt-image)
[![NPM version](https://badge.fury.io/js/grunt-image.png)](http://badge.fury.io/js/grunt-image)
[![Dependency Status](https://david-dm.org/1000ch/grunt-image.png)](https://david-dm.org/1000ch/grunt-image)
[![devDependency Status](https://david-dm.org/1000ch/grunt-image/dev-status.png)](https://david-dm.org/1000ch/grunt-image#info=devDependencies)

[![NPM](https://nodei.co/npm/grunt-image.png)](https://nodei.co/npm/grunt-image/)

## Dependency

`jpeg-recompress` requires `libjpeg-turbo`, so you have to install some libraries before getting `grunt-image`.

### Ubuntu

```sh
$ sudo apt-get install build-essential libjpeg-turbo8 libjpeg-turbo8-dev
```

### Mac OS X

```sh
$ brew install libjpeg libjpeg-turbo
```

## Install

```sh
$ npm install --save-dev grunt-image
```

## Usage

This is `gruntfile.js` sample similar to [`grunt-contrib-imagemin`](https://github.com/gruntjs/grunt-contrib-imagemin) one. 

```js
module.exports = function (grunt) {
  grunt.initConfig({
    image: {
      static: {
        files: { 
          'dist/img.png': 'src/img.png',
          'dist/img.jpg': 'src/img.jpg',
          'dist/img.gif': 'src/img.gif'
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    }
  });
    
  grunt.loadNpmTasks('grunt-image');
};
```

## png

### pngquant

- ✔ https://github.com/sindresorhus/node-pngquant-bin
- https://github.com/zauni/node-pngquant-bin
- https://github.com/papandreou/node-pngquant

```sh
--speed N         speed/quality trade-off. 1=slow, 3=default, 11=fast & rough
--quality      min-max don't save below min, use less colors below max (0-100)
```

### optipng

- ✔ https://github.com/yeoman/node-optipng-bin
- https://github.com/papandreou/node-optipng

```sh
-fix           enable error recovery
-oN
-i <type>   PNG interlace type (0-1)
-strip <objects>  strip metadata objects (e.g. "all")
```

### advpng

- ✔ https://github.com/1000ch/node-advpng-bin
- https://github.com/colorhook/node-advpng

```sh
--recompress      Recompress the specified files
--shrink-extra    Compress extra (7z)
```

### zopflipng

- ✔ https://github.com/1000ch/node-zopflipng-bin

```sh
-m: compress more: use more iterations (depending on file size) and use block split strategy 3
--iterations=[number]: number of iterations, more iterations makes it slower but provides slightly better compression. Default: 15 for small files, 5 for large files.
--lossy_transparent: remove colors behind alpha channel 0. No visual difference, removes hidden information.
--lossy_8bit: convert 16-bit per channel image to 8-bit per channel.
--filters=[types]: filter strategies to try:
 0-4: give all scanlines PNG filter type 0-4
 m: minimum sum
 e: entropy
 p: predefined (keep from input, this likely overlaps another strategy)
 b: brute force (experimental)
 By default, if this argument is not given, one that is most likely the best for this image is chosen by trying faster compression with each type.
 If this argument is used, all given filter types are tried with slow compression and the best result retained. A good set of filters to try is --filters=0me.
```

### pngcrush

- ✔ https://github.com/1000ch/node-pngcrush-bin
- https://github.com/papandreou/node-pngcrush

```sh
-rem chunkname (or "alla" or "allb")
-brute (use brute-force: try 148 different methods)
-reduce (do lossless color-type or bit-depth reduction)
```

## jpg

### jpegtran

- ✔ https://github.com/yeoman/node-jpegtran-bin
- https://github.com/papandreou/node-jpegtran

```sh
-optimize      Optimize Huffman table (smaller file, but slow compression)
-progressive   Create progressive JPEG file
```

### jpeg-recompress

- ✔ https://github.com/1000ch/node-jpeg-recompress-bin

```sh
-p, --progressive             Set progressive JPEG output
-s, --strip                   Strip metadata
```

## gif

### gifsicle

- ✔ https://github.com/yeoman/node-gifsicle

### Using options

```sh
-i, --interlace               Turn on interlacing.
-O, --optimize[=LEVEL]        Optimize output GIFs.
--careful                     Write larger GIFs that avoid bugs in other programs.
```

## License

MIT
