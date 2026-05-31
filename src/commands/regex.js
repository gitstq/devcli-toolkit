const { Command } = require('commander');
const chalk = require('chalk');

const regexCmd = new Command('regex')
  .description('🔍 Regex tester and utilities')
  .argument('<pattern>', 'Regex pattern')
  .argument('<text>', 'Text to test against')
  .option('-g, --global', 'Global search')
  .option('-i, --ignoreCase', 'Case insensitive')
  .option('-m, --multiline', 'Multiline mode')
  .option('-r, --replace <replacement>', 'Replace matches with')
  .action((pattern, text, options) => {
    try {
      // Build flags
      let flags = '';
      if (options.global) flags += 'g';
      if (options.ignoreCase) flags += 'i';
      if (options.multiline) flags += 'm';

      // Create regex
      const regex = new RegExp(pattern, flags);

      if (options.replace !== undefined) {
        // Replace mode
        const result = text.replace(regex, options.replace);
        console.log(chalk.green('✅ Replaced:'));
        console.log(chalk.cyan(result));
      } else {
        // Test mode
        const matches = text.match(regex);
        
        if (matches) {
          console.log(chalk.green(`✅ Found ${matches.length} match(es):`));
          matches.forEach((match, index) => {
            console.log(chalk.cyan(`  ${index + 1}. ${match}`));
          });

          // Show capture groups if any
          if (matches.groups) {
            console.log(chalk.dim('\nNamed groups:'));
            Object.entries(matches.groups).forEach(([name, value]) => {
              console.log(`  ${name}: ${value}`);
            });
          }
        } else {
          console.log(chalk.yellow('⚠️  No matches found'));
        }
      }
    } catch (error) {
      console.error(chalk.red('❌ Regex Error:'), error.message);
    }
  });

// Add common patterns subcommand
regexCmd
  .command('patterns')
  .description('📚 Show common regex patterns')
  .action(() => {
    console.log(chalk.green('📚 Common Regex Patterns:'));
    console.log(chalk.dim('═══════════════════════════════════════════════════\n'));

    const patterns = [
      { name: 'Email', pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$', example: 'user@example.com' },
      { name: 'URL', pattern: 'https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', example: 'https://example.com' },
      { name: 'IPv4', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', example: '192.168.1.1' },
      { name: 'Phone (US)', pattern: '^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$', example: '(555) 123-4567' },
      { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', example: '2024-01-15' },
      { name: 'Hex Color', pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', example: '#FF5733' },
      { name: 'UUID', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$', example: '550e8400-e29b-41d4-a716-446655440000' },
    ];

    patterns.forEach((p, index) => {
      console.log(chalk.cyan(`${index + 1}. ${p.name}`));
      console.log(`   Pattern: ${chalk.dim(p.pattern)}`);
      console.log(`   Example: ${chalk.green(p.example)}`);
      console.log('');
    });

    console.log(chalk.dim('Use: devcli regex "<pattern>" "<text>"'));
  });

module.exports = regexCmd;
