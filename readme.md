# grunt-image [![Build Status](https://travis-ci.org/1000ch/grunt-image.png?branch=master)](https://travis-ci.org/1000ch/grunt-image)

## About

Optimize PNG, JPEG, GIF images with command line.

## Usage

This is `gruntfile.js` sample similar to [`grunt-contrib-imagemin`](https://github.com/gruntjs/grunt-contrib-imagemin) one. 

```js
module.exports = function (grunt) {
  grunt.initConfig({
    image: {
      static: {
        options: {
          qualityRange: '80-100',
          optimizationLevel: 3
        },
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

Execute `./node_modules/pngquant-bin/vendor/pngquant -h` to see more details.

### optipng

- ✔ https://github.com/yeoman/node-optipng-bin
- https://github.com/papandreou/node-optipng

```sh
-fix           enable error recovery
-oN
-i <type>   PNG interlace type (0-1)
-strip <objects>  strip metadata objects (e.g. "all")
```

Execute `./node_modules/optipng-bin/vendor/optipng -h` to see more details.

### advpng

- ✔ https://github.com/colorhook/node-advpng

```sh
--shrink-normal   Compress normal (7z)
```

Execute `./node_modules/node-advpng/bin/advpng -h` to see more details.

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

Execute `./node_modules/node-advpng/bin/advpng -h` to see more details.

### pngcrush

- ✔ https://github.com/1000ch/node-pngcrush-bin
- https://github.com/papandreou/node-pngcrush

```sh
-rem chunkname (or "alla" or "allb")
-brute (use brute-force: try 148 different methods)
-reduce (do lossless color-type or bit-depth reduction)
```

Execute `./node_modules/pngcrush-bin/vendor/pngcrush -h` to see more details.

## jpg

### jpegtran

- ✔ https://github.com/yeoman/node-jpegtran-bin
- https://github.com/papandreou/node-jpegtran

```sh
-optimize      Optimize Huffman table (smaller file, but slow compression)
-progressive   Create progressive JPEG file
```

Execute `./node_modules/jpegtran-bin/vendor/jpegtran -h` to see more details.

## gif

### gifsicle

- ✔ https://github.com/yeoman/node-gifsicle

### Using options

```sh
-i, --interlace               Turn on interlacing.
-O, --optimize[=LEVEL]        Optimize output GIFs.
--careful                     Write larger GIFs that avoid bugs in other programs.
```

Execute `./node_modules/gifsicle/vendor/gifsicle -h` to see more details.

## License

MIT.