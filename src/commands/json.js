const { Command } = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

const jsonCmd = new Command('json')
  .description('📋 JSON utilities - format, validate, minify')
  .argument('[input]', 'JSON string or file path')
  .option('-f, --format', 'Format/prettify JSON')
  .option('-m, --minify', 'Minify JSON')
  .option('-v, --validate', 'Validate JSON syntax')
  .option('-c, --clipboard', 'Copy result to clipboard')
  .option('-i, --indent <number>', 'Indentation spaces', '2')
  .action((input, options) => {
    try {
      let jsonStr = input;
      
      // If no input, try to read from stdin or use example
      if (!jsonStr) {
        console.log(chalk.yellow('⚠️  No input provided. Use: devcli json \'{"key":"value"}\''));
        console.log(chalk.dim('Example: devcli json \'{"name":"John","age":30}\' --format'));
        return;
      }

      // Parse JSON
      let parsed;
      try {
        parsed = JSON.parse(jsonStr);
      } catch (e) {
        console.log(chalk.red('❌ Invalid JSON:'), e.message);
        return;
      }

      let result;

      if (options.minify) {
        result = JSON.stringify(parsed);
        console.log(chalk.green('✅ Minified JSON:'));
      } else if (options.validate) {
        console.log(chalk.green('✅ Valid JSON'));
        console.log(chalk.dim('Type:'), typeof parsed);
        console.log(chalk.dim('Keys:'), Object.keys(parsed).length);
        return;
      } else {
        // Default: format
        const indent = parseInt(options.indent) || 2;
        result = JSON.stringify(parsed, null, indent);
        console.log(chalk.green('✅ Formatted JSON:'));
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

// Add subcommand for JSON stats
jsonCmd
  .command('stats')
  .description('📊 Show JSON statistics')
  .argument('<input>', 'JSON string')
  .action((input) => {
    try {
      const parsed = JSON.parse(input);
      const str = JSON.stringify(parsed);
      
      console.log(chalk.green('📊 JSON Statistics:'));
      console.log(chalk.dim('─────────────────'));
      console.log(`Size: ${chalk.cyan(str.length)} bytes`);
      console.log(`Type: ${chalk.cyan(Array.isArray(parsed) ? 'array' : typeof parsed)}`);
      
      if (typeof parsed === 'object' && parsed !== null) {
        const keys = Object.keys(parsed);
        console.log(`Keys: ${chalk.cyan(keys.length)}`);
        if (keys.length > 0 && keys.length <= 10) {
          console.log(`Key names: ${chalk.dim(keys.join(', '))}`);
        }
      }
    } catch (error) {
      console.error(chalk.red('❌ Invalid JSON:'), error.message);
    }
  });

module.exports = jsonCmd;
