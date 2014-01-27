var path = require('path');

var duplex = require('duplexer');
var spawn = require('child_process').spawn;
var through = require('through2');
var pipeline = require('stream-combiner');
var concat = require('concat-stream');
var filesize = require('filesize');

function ImgOpt(options) {
  this.options = options || {};
  this.src = options.src || '';
  this.dest = options.dest || '';
  this.extension = path.extname(options.extension);
  this.optimizers = this.getOptimizers(this.extension);
}

ImgOpt.prototype.optipng = function () {
  var args = ['-v'];
  var optipng = require('optipng-bin').path;

  return spawn(optipng, args);
};

ImgOpt.prototype.getOptimizers = function (extension) {
  var optimizers = [];
  extension = extension.toLowerCase();
  switch (extension) {
    case '.png':
      optimizers.push(this.optipng());
      break;
    case '.jpg':
      break;
    case '.gif':
      break;
  }
  return optimizers;
};

ImgOpt.prototype.optimize = function () {
  this.optimizers.forEach(function (optimizer) {
    var childProcess = optimizer();
    var size = [];
    var sizeDest;
    var stream = duplex(childProcess.stdin, childProcess.stdout);
    var src = through(function (data, encode, callback) {
      size.push(data);
      this.push(data);
      callback();
    });
    
    childProcess.stdout.pipe(concat(function (data) {
      sizeDest = new Buffer(data).length;
    }));
    
    childProcess.stdout.on('close', function () {
      size = Buffer.concat(size).length;
      
      var saved = size - sizeDest;
      stream.emit('close', {
        originalSize: filesize(size),
        originalSizeRaw: size,
        diffSize: filesize(sized),
        diffSizeRaw: saved
      });
    });
    
    return pipeline(src, stream);
  });
};

module.exports = ImgOpt;