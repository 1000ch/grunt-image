"use strict";

var fs = require('fs');
var path = require('path');

var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;
var async = require('async');
var grunt = require('grunt');

function Optimizer(options) {
  this.options = options || {};
  this.src = options.src;
  this.dest = options.dest || this.src;
  this.extension = path.extname(this.src);
  this.optimizers = this.getOptimizers(this.extension);
}

Optimizer.prototype.optipng = function (optimizationLevel) {
  optimizationLevel = optimizationLevel || 7;
  var args = [];
  //args.push('-v');
  args.push('-fix');
  args.push('-o' + optimizationLevel);
  args.push('-force');
  args.push('-out');
  args.push(this.dest);
  args.push(this.src);

  return {
    name: 'optipng',
    path: require('optipng-bin').path, 
    args: args
  };
};

Optimizer.prototype.pngquant = function (qualityRange) {
  qualityRange = qualityRange || '0-100';
  var args = [];
  args.push('--ext=.png');
  args.push('--quality=' + qualityRange);
  args.push('--force');
  args.push(this.dest);

  return {
    name: 'pngquant',
    path: require('pngquant-bin').path,
    args: args
  };
};

Optimizer.prototype.advpng = function () {
  var args = [];
  args.push('--shrink-normal');
  args.push(this.dest);

  return {
    name: 'advpng',
    path: require('node-advpng').path,
    args: args
  };
};

Optimizer.prototype.pngcrush = function () {
  var args = [];
  args.push('-rem alla');
  args.push('-brute');
  args.push('-reduce');
  args.push(this.dest);
  
  return {
    name: 'pngcrush',
    path: require('pngcrush-bin').path,
    args: args
  };
};

Optimizer.prototype.gifsicle = function () {
  var args = [];
  args.push('--careful');
  args.push('--interlace');
  args.push('--optimize');
  args.push('--output');
  args.push(this.dest);
  args.push(this.src);

  return {
    name: 'gifsicle',
    path: require('gifsicle').path,
    args: args
  };
};

Optimizer.prototype.jpegtran = function () {
  var args = [];
  args.push('-optimize');
  args.push('-progressive');
  args.push('-outfile');
  args.push(this.dest);
  args.push(this.src);
  
  return {
    name: 'jpegtran',
    path: require('jpegtran-bin').path,
    args: args
  };
};

Optimizer.prototype.getOptimizers = function (extension) {
  var optimizers = [];
  extension = extension.toLowerCase();
  switch (extension) {
    case '.png':
      optimizers.push(this.optipng(this.optimizationLevel));
      optimizers.push(this.pngquant(this.qualityRange));
      optimizers.push(this.pngcrush());
      optimizers.push(this.advpng());
      break;
    case '.jpg':
      optimizers.push(this.jpegtran());
      break;
    case '.gif':
      optimizers.push(this.gifsicle());
      break;
  }
  return optimizers;
};

Optimizer.prototype.copyFile = function (src, dest) {

  var readStream = fs.createReadStream(src);
  var writeStream;
  
  if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
    // dest is directory
    var basename = path.basename(src);
    writeStream = fs.createWriteStream(path.join(dest, basename));
  } else if (fs.existsSync(dest) && fs.statSync(dest).isFile()) {
    // dest is file
    writeStream = fs.createWriteStream(dest);
  } else {
    writeStream = fs.createWriteStream(dest);
  }
  
  readStream.pipe(writeStream);
};

Optimizer.prototype.optimize = function (callback) {

  var fns = this.optimizers.map(function (optimizer) {
    return function (callback) {
      execFile(optimizer.path, optimizer.args, function () {
        callback(null, optimizer.name);
      });
    };
  });
  
  async.series(fns, function (error, result) {
    callback(error);
  });
  
  //this.optimizers.forEach(function (optimizer) {
  //  execFile(optimizer.path, optimizer.args, callback);
  //});
};

module.exports = Optimizer;