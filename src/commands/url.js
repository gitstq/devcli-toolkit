const { Command } = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

const urlCmd = new Command('url')
  .description('🔗 URL encoder/decoder and parser')
  .argument('<input>', 'URL or string to process')
  .option('-d, --decode', 'Decode URL/percent-encoding')
  .option('-e, --encode', 'URL encode string')
  .option('-p, --parse', 'Parse URL components')
  .option('-c, --clipboard', 'Copy result to clipboard')
  .action((input, options) => {
    try {
      let result;

      if (options.decode) {
        result = decodeURIComponent(input);
        console.log(chalk.green('✅ Decoded:'));
      } else if (options.encode) {
        result = encodeURIComponent(input);
        console.log(chalk.green('✅ Encoded:'));
      } else if (options.parse) {
        // Parse URL
        let urlStr = input;
        if (!urlStr.startsWith('http')) {
          urlStr = 'https://' + urlStr;
        }
        
        const url = new URL(urlStr);
        console.log(chalk.green('🔗 URL Components:'));
        console.log(chalk.dim('═══════════════════════════════════════'));
        console.log(`Protocol: ${chalk.cyan(url.protocol)}`);
        console.log(`Hostname: ${chalk.cyan(url.hostname)}`);
        console.log(`Port:     ${chalk.cyan(url.port || '(default)')}`);
        console.log(`Path:     ${chalk.cyan(url.pathname)}`);
        console.log(`Search:   ${chalk.cyan(url.search || '(none)')}`);
        console.log(`Hash:     ${chalk.cyan(url.hash || '(none)')}`);
        
        if (url.searchParams.toString()) {
          console.log(chalk.dim('\nQuery Parameters:'));
          for (const [key, value] of url.searchParams) {
            console.log(`  ${key}: ${chalk.cyan(value)}`);
          }
        }
        return;
      } else {
        // Default: encode
        result = encodeURIComponent(input);
        console.log(chalk.green('✅ Encoded (default):'));
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

// Add query builder subcommand
urlCmd
  .command('build')
  .description('🏗️  Build URL with query parameters')
  .requiredOption('-b, --base <url>', 'Base URL')
  .option('-p, --params <params>', 'Query params (key1=value1,key2=value2)')
  .action((options) => {
    try {
      let urlStr = options.base;
      if (!urlStr.startsWith('http')) {
        urlStr = 'https://' + urlStr;
      }

      const url = new URL(urlStr);

      if (options.params) {
        const pairs = options.params.split(',');
        pairs.forEach(pair => {
          const [key, value] = pair.split('=');
          if (key && value !== undefined) {
            url.searchParams.append(key, value);
          }
        });
      }

      console.log(chalk.green('🏗️  Built URL:'));
      console.log(chalk.cyan(url.toString()));
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

module.exports = urlCmd;
