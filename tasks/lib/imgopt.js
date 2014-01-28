var path = require('path');

var duplex = require('duplexer');
var spawn = require('child_process').spawn;
var through = require('through2');
var pipeline = require('stream-combiner');
var concat = require('concat-stream');
var filesize = require('filesize');
var grunt = require('grunt');

function ImgOpt(options) {
  this.options = options || {};
  this.src = options.src || '';
  this.dest = options.dest || '';
  this.extension = path.extname(this.src);
  this.optimizers = this.getOptimizers(this.extension);
}

ImgOpt.prototype.optipng = function (optimizationLevel) {
  optimizationLevel = optimizationLevel || 7;
  var args = ['-v', '-o' + optimizationLevel];
  var optipng = require('optipng-bin').path;

  return {
    path: optipng, 
    args: args
  };
};

ImgOpt.prototype.getOptimizers = function (extension) {
  var optimizers = [];
  extension = extension.toLowerCase();
  switch (extension) {
    case '.png':
      optimizers.push(this.optipng(this.optimizationLevel));
      break;
    case '.jpg':
      break;
    case '.gif':
      break;
  }
  return optimizers;
};

ImgOpt.prototype.optimize = function (callback) {
  this.optimizers.forEach(function (optimizer) {
    var spawn = grunt.util.spawn({
      cmd: optimizer.path,
      args: optimizer.args
    }, function () {});
    
    spawn.stdout.pipe(process.stdout);
    spawn.stderr.pipe(process.stderr);
    spawn.on('exit', callback)
  });
};

module.exports = ImgOpt;