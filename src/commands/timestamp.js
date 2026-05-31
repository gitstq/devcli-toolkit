const { Command } = require('commander');
const chalk = require('chalk');

const timestampCmd = new Command('time')
  .description('⏰ Timestamp and date utilities')
  .argument('[input]', 'Timestamp or date string')
  .option('-n, --now', 'Show current timestamp')
  .option('-f, --format <format>', 'Output format (iso, utc, local)', 'iso')
  .option('-u, --unix', 'Output Unix timestamp (seconds)')
  .option('-ms, --millis', 'Output Unix timestamp (milliseconds)')
  .action((input, options) => {
    try {
      let date;

      if (options.now || !input) {
        date = new Date();
        console.log(chalk.green('🕐 Current Time:'));
      } else {
        // Parse input
        if (/^\d+$/.test(input)) {
          // Unix timestamp
          const ts = parseInt(input);
          date = new Date(ts < 10000000000 ? ts * 1000 : ts);
        } else {
          date = new Date(input);
        }
        console.log(chalk.green('🕐 Converted Time:'));
      }

      if (isNaN(date.getTime())) {
        console.log(chalk.red('❌ Invalid date/time'));
        return;
      }

      // Output based on format option
      if (options.unix) {
        console.log(chalk.cyan(Math.floor(date.getTime() / 1000).toString()));
      } else if (options.millis) {
        console.log(chalk.cyan(date.getTime().toString()));
      } else if (options.format === 'utc') {
        console.log(chalk.cyan(date.toUTCString()));
      } else if (options.format === 'local') {
        console.log(chalk.cyan(date.toLocaleString()));
      } else {
        console.log(chalk.cyan(date.toISOString()));
      }

      // Show all formats
      console.log(chalk.dim('\nAll formats:'));
      console.log(`  ISO:      ${chalk.dim(date.toISOString())}`);
      console.log(`  UTC:      ${chalk.dim(date.toUTCString())}`);
      console.log(`  Local:    ${chalk.dim(date.toLocaleString())}`);
      console.log(`  Unix (s): ${chalk.dim(Math.floor(date.getTime() / 1000))}`);
      console.log(`  Unix (ms):${chalk.dim(date.getTime())}`);
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Add conversion subcommand
timestampCmd
  .command('convert')
  .description('🔄 Convert between time formats')
  .argument('<value>', 'Time value to convert')
  .option('-t, --to <format>', 'Target format (iso, utc, unix, local)', 'iso')
  .action((value, options) => {
    try {
      let date;
      
      if (/^\d+$/.test(value)) {
        const ts = parseInt(value);
        date = new Date(ts < 10000000000 ? ts * 1000 : ts);
      } else {
        date = new Date(value);
      }

      if (isNaN(date.getTime())) {
        console.log(chalk.red('❌ Invalid date/time'));
        return;
      }

      let result;
      switch (options.to) {
        case 'unix':
          result = Math.floor(date.getTime() / 1000).toString();
          break;
        case 'ms':
        case 'millis':
          result = date.getTime().toString();
          break;
        case 'utc':
          result = date.toUTCString();
          break;
        case 'local':
          result = date.toLocaleString();
          break;
        case 'iso':
        default:
          result = date.toISOString();
      }

      console.log(chalk.green(`✅ Converted (${options.to}):`));
      console.log(chalk.cyan(result));
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

module.exports = timestampCmd;
