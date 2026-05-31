const { Command } = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

const base64Cmd = new Command('base64')
  .description('🔐 Base64 encode/decode utilities')
  .argument('<input>', 'String to encode/decode')
  .option('-d, --decode', 'Decode Base64 string')
  .option('-c, --clipboard', 'Copy result to clipboard')
  .option('-u, --urlsafe', 'Use URL-safe Base64')
  .action((input, options) => {
    try {
      let result;

      if (options.decode) {
        // Decode
        let base64Str = input;
        if (options.urlsafe) {
          base64Str = base64Str.replace(/-/g, '+').replace(/_/g, '/');
        }
        result = Buffer.from(base64Str, 'base64').toString('utf-8');
        console.log(chalk.green('✅ Decoded:'));
      } else {
        // Encode
        result = Buffer.from(input).toString('base64');
        if (options.urlsafe) {
          result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        }
        console.log(chalk.green('✅ Encoded:'));
      }

      console.log(chalk.cyan(result));

      if (options.clipboard) {
        clipboardy.writeSync(result);
        console.log(chalk.dim('📋 Copied to clipboard'));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Add file subcommand
base64Cmd
  .command('file')
  .description('📁 Base64 encode/decode files')
  .argument('<filepath>', 'File path')
  .option('-d, --decode', 'Decode Base64 to file')
  .option('-o, --output <path>', 'Output file path')
  .action((filepath, options) => {
    const fs = require('fs');
    const path = require('path');
    
    try {
      if (options.decode) {
        // Decode file
        const base64Content = fs.readFileSync(filepath, 'utf-8');
        const decoded = Buffer.from(base64Content, 'base64');
        const outputPath = options.output || filepath + '.decoded';
        fs.writeFileSync(outputPath, decoded);
        console.log(chalk.green(`✅ Decoded to: ${outputPath}`));
      } else {
        // Encode file
        const content = fs.readFileSync(filepath);
        const encoded = content.toString('base64');
        const outputPath = options.output || filepath + '.b64';
        fs.writeFileSync(outputPath, encoded);
        console.log(chalk.green(`✅ Encoded to: ${outputPath}`));
        console.log(chalk.dim(`Size: ${content.length} bytes → ${encoded.length} bytes`));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

module.exports = base64Cmd;
