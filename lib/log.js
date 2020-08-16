'use strict';
const {round10} = require('round10');
const chalk = require('chalk');
const prettyBytes = require('pretty-bytes');

module.exports = (filePath, originalBytes, optimizedBytes) => {
  const difference = originalBytes - optimizedBytes;
  const percent = round10(100 * (difference / originalBytes), -1);

  if (difference <= 0) {
    console.info(
      chalk.green('- ') + filePath + chalk.gray(' ->') +
      chalk.gray(' Cannot improve upon ') + chalk.cyan(prettyBytes(originalBytes))
    );
  } else {
    console.info(
      chalk.green('✔ ') + filePath + chalk.gray(' ->') +
      chalk.gray(' before=') + chalk.yellow(prettyBytes(originalBytes)) +
      chalk.gray(' after=') + chalk.cyan(prettyBytes(optimizedBytes)) +
      chalk.gray(' reduced=') + chalk.green(`${prettyBytes(difference)} (${percent}%)`)
    );
  }
};
