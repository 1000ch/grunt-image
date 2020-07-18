'use strict';
const {round10} = require('round10');
const chalk = require('chalk');
const filesize = require('filesize');

module.exports = (filePath, originalSize, optimizedSize) => {
  const diffSize = originalSize - optimizedSize;
  const diffPercent = round10(100 * (diffSize / originalSize), -1);

  if (diffSize <= 0) {
    console.info(
      chalk.green('- ') + filePath + chalk.gray(' ->') +
      chalk.gray(' Cannot improve upon ') + chalk.cyan(filesize(originalSize))
    );
  } else {
    console.info(
      chalk.green('✔ ') + filePath + chalk.gray(' ->') +
      chalk.gray(' before=') + chalk.yellow(filesize(originalSize)) +
      chalk.gray(' after=') + chalk.cyan(filesize(optimizedSize)) +
      chalk.gray(' reduced=') + chalk.green(`${filesize(diffSize)} (${diffPercent}%)`)
    );
  }
};
