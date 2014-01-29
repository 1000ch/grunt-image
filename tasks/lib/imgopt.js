"use strict";

var fs = require('fs');
var path = require('path');

var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;
var filesize = require('filesize');
var grunt = require('grunt');

function ImgOpt(options) {
  this.options = options || {};
  this.src = options.src;
  this.dest = options.dest || this.src;
  this.extension = path.extname(this.src);
  this.optimizers = this.getOptimizers(this.extension);
}

ImgOpt.prototype.optipng = function (optimizationLevel) {
  optimizationLevel = optimizationLevel || 7;
  var args = [];
  args.push('-v');
  args.push('-o' + optimizationLevel);
  args.push(this.dest);

  return {
    name: 'optipng',
    path: require('optipng-bin').path, 
    args: args
  };
};

ImgOpt.prototype.pngquant = function (qualityRange) {
  qualityRange = qualityRange || '0-100';
  var args = [];
  args.push('--ext=' + this.dest);
  args.push('--quality=' + qualityRange);
  args.push('--');
  args.push(this.src);

  return {
    name: 'pngquant',
    path: require('pngquant-bin').path,
    args: args
  };
};

ImgOpt.prototype.advpng = function () {
  var args = [];
  args.push(this.dest);

  return {
    name: 'advpng',
    path: require('node-advpng').path,
    args: args
  };
};

ImgOpt.prototype.gifsicle = function () {
  var args = [];
  args.push('-o');
  args.push(this.dest);
  args.push(this.src);

  return {
    name: 'gifsicle',
    path: require('gifsicle').path,
    args: args
  };
};

ImgOpt.prototype.jpegtran = function () {
  var args = [];
  args.push('-outfile');
  args.push(this.dest);
  args.push(this.src);
  
  return {
    name: 'jpegtran',
    path: require('jpegtran-bin').path,
    args: args
  };
};

ImgOpt.prototype.getOptimizers = function (extension) {
  var optimizers = [];
  extension = extension.toLowerCase();
  switch (extension) {
    case '.png':
      optimizers.push(this.pngquant(this.qualityRange));
      optimizers.push(this.optipng(this.optimizationLevel));
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

ImgOpt.prototype.copyFile = function (src, dest) {

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

ImgOpt.prototype.optimize = function (callback) {

  this.copyFile(this.src, this.dest);
  this.optimizers.forEach(function (optimizer) {
    execFile(optimizer.path, optimizer.args, callback);
  });
};

module.exports = ImgOpt;