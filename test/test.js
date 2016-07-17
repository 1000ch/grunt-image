'use strict';

const fs = require('fs');

exports.image = {
  minifyPng: test => {
    test.expect(1);

    const actual = fs.statSync('tmp/test.png').size;
    const original = fs.statSync('test/fixtures/test.png').size;
    test.ok(actual < original, 'should minify PNG images');

    test.done();
  },
  minifyJpg: test => {
    test.expect(1);

    const actual = fs.statSync('tmp/test.jpg').size;
    const original = fs.statSync('test/fixtures/test.jpg').size;
    test.ok(actual < original, 'should minify JPG images');

    test.done();
  },
  minifyGif: test => {
    test.expect(1);

    const actual = fs.statSync('tmp/test.gif').size;
    const original = fs.statSync('test/fixtures/test.gif').size;
    test.ok(actual < original, 'should minify GIF images');

    test.done();
  },
  minifySVG: test => {
    test.expect(1);

    const actual = fs.statSync('tmp/test.svg').size;
    const original = fs.statSync('test/fixtures/test.svg').size;
    test.ok(actual < original, 'should minify SVG images');

    test.done();
  }
};
