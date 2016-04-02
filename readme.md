# [grunt-image](https://npmjs.org/package/grunt-image)

Optimize PNG, JPEG, GIF, SVG images with grunt task.

[![Build Status](https://travis-ci.org/1000ch/grunt-image.svg?branch=master)](https://travis-ci.org/1000ch/grunt-image)
[![NPM version](https://badge.fury.io/js/grunt-image.svg)](http://badge.fury.io/js/grunt-image)
[![Dependency Status](https://david-dm.org/1000ch/grunt-image.svg)](https://david-dm.org/1000ch/grunt-image)
[![devDependency Status](https://david-dm.org/1000ch/grunt-image/dev-status.svg)](https://david-dm.org/1000ch/grunt-image#info=devDependencies)

## Install

```sh
$ npm install --save-dev grunt-image
```

## Usage

This is an example of `gruntfile.js`.

```js
module.exports = function (grunt) {
  grunt.initConfig({
    image: {
      static: {
        options: {
          pngquant: true,
          optipng: false,
          zopflipng: true,
          advpng: true,
          jpegRecompress: false,
          jpegoptim: true,
          mozjpeg: true,
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

`options` attributes are optional.  
If you don't want to set as optimizer, set false.  
When you omitted, the optimizer will be applied.

## Result

![](https://raw.github.com/1000ch/grunt-image/master/screenshot/terminal.png)

## PNG Optimizers

### pngquant

- ✔ https://github.com/imagemin/pngquant-bin

```sh
--speed N         speed/quality trade-off. 1=slow, 3=default, 11=fast & rough
--quality      min-max don't save below min, use less colors below max (0-100)
```

### optipng

- ✔ https://github.com/imagemin/optipng-bin

```sh
-fix           enable error recovery
-oN
-i <type>   PNG interlace type (0-1)
-strip <objects>  strip metadata objects (e.g. "all")
```

### advpng

- ✔ https://github.com/imagemin/advpng-bin

```sh
--recompress      Recompress the specified files
--shrink-extra    Compress extra (7z)
```

### zopflipng

- ✔ https://github.com/imagemin/zopflipng-bin

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

- ✔ https://github.com/imagemin/pngcrush-bin

```sh
-rem chunkname (or "alla" or "allb")
-brute (use brute-force: try 148 different methods)
-reduce (do lossless color-type or bit-depth reduction)
```

## JPEG Optimizers

### jpeg-recompress

- ✔ https://github.com/imagemin/jpeg-recompress-bin

```sh
-p, --progressive             Set progressive JPEG output
-s, --strip                   Strip metadata
```

### jpegoptim

- ✔ https://github.com/imagemin/jpegoptim-bin

```sh
--strip-all       strip all (Comment & Exif) markers from output file
--strip-iptc      strip IPTC markers from output file
--strip-icc       strip ICC profile markers from output file
--all-progressive force all output files to be progressive
```

## GIF Optimizer

### gifsicle

- ✔ https://github.com/imagemin/gifsicle-bin

```sh
-i, --interlace               Turn on interlacing.
-O, --optimize[=LEVEL]        Optimize output GIFs.
--careful                     Write larger GIFs that avoid bugs in other programs.
```

## SVG Optimizer

### svgo

- ✔ https://github.com/svg/svgo

## License

MIT: http://1000ch.mit-license.org/
