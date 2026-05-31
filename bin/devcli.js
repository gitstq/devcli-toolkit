#!/usr/bin/env node

/**
 * DevCLI Toolkit - Main Entry Point
 * A lightweight, all-in-one CLI toolkit for developers
 */

const { program } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');

// Import command modules
const jsonCommand = require('../src/commands/json');
const base64Command = require('../src/commands/base64');
const timestampCommand = require('../src/commands/timestamp');
const uuidCommand = require('../src/commands/uuid');
const passwordCommand = require('../src/commands/password');
const qrCommand = require('../src/commands/qr');
const regexCommand = require('../src/commands/regex');
const urlCommand = require('../src/commands/url');

// Display banner
function showBanner() {
  console.log(chalk.cyan(`
  ╔══════════════════════════════════════════════════════════╗
  ║                                                          ║
  ║   🚀 ${chalk.bold('DevCLI Toolkit')} v${pkg.version}                           ║
  ║   ${chalk.dim('A lightweight, all-in-one CLI for developers')}          ║
  ║                                                          ║
  ╚══════════════════════════════════════════════════════════╝
  `));
}

// Configure CLI
program
  .name('devcli')
  .description('🛠️  A lightweight, all-in-one CLI toolkit for developers')
  .version(pkg.version, '-v, --version', 'Display version number')
  .option('-b, --banner', 'Show banner on startup')
  .on('option:banner', () => {
    showBanner();
  });

// Register commands
program.addCommand(jsonCommand);
program.addCommand(base64Command);
program.addCommand(timestampCommand);
program.addCommand(uuidCommand);
program.addCommand(passwordCommand);
program.addCommand(qrCommand);
program.addCommand(regexCommand);
program.addCommand(urlCommand);

// Default action - show help
program.action(() => {
  showBanner();
  program.help();
});

// Parse arguments
program.parse();

// If no arguments, show help
if (!process.argv.slice(2).length) {
  showBanner();
  program.outputHelp();
}
