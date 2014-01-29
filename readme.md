# grunt-image

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

## Reference

- pngquant
    - ✔ https://github.com/sindresorhus/node-pngquant-bin
        - https://github.com/pornel/pngquant
    - https://github.com/zauni/node-pngquant-bin
    - https://github.com/papandreou/node-pngquant
- gifsicle
    - ✔ https://github.com/yeoman/node-gifsicle
- jpegtran
    - ✔ https://github.com/yeoman/node-jpegtran-bin
    - https://github.com/papandreou/node-jpegtran
- optipng
    - ✔ https://github.com/yeoman/node-optipng-bin
    - https://github.com/papandreou/node-optipng
- advpng
    - ✔ https://github.com/colorhook/node-advpng
- pngcrush
    - https://github.com/papandreou/node-pngcrush
    
## Symbols

- ✘
- ✔

## License

MIT.