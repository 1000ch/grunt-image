# grunt-image

## About

Optimize PNG, JPEG, GIF images with command line.

**This is unstable now** .

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
--quality      min-max don't save below min, use less colors below max (0-100)
```

Execute `./node_modules/pngquant-bin/vendor/pngquant -h` to see more details.

### optipng

- ✔ https://github.com/yeoman/node-optipng-bin
- https://github.com/papandreou/node-optipng

```sh
-fix           enable error recovery
-oN
```

Execute `./node_modules/optipng-bin/vendor/optipng -h` to see more details.

### advpng

- ✔ https://github.com/colorhook/node-advpng

```sh
--shrink-normal   Compress normal (7z)
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

## Symbols

- ✘
- ✔

## License

MIT.