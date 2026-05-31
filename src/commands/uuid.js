const { Command } = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const crypto = require('crypto');

const uuidCmd = new Command('uuid')
  .description('🔑 UUID/GUID generator')
  .option('-n, --number <count>', 'Number of UUIDs to generate', '1')
  .option('-u, --uppercase', 'Output uppercase')
  .option('-c, --clipboard', 'Copy first UUID to clipboard')
  .option('-v, --version <ver>', 'UUID version (4)', '4')
  .action((options) => {
    try {
      const count = parseInt(options.number) || 1;
      const uuids = [];

      for (let i = 0; i < count; i++) {
        let uuid;
        if (options.version === '4') {
          uuid = crypto.randomUUID();
        } else {
          uuid = crypto.randomUUID();
        }

        if (options.uppercase) {
          uuid = uuid.toUpperCase();
        }

        uuids.push(uuid);
      }

      if (count === 1) {
        console.log(chalk.green('✅ Generated UUID:'));
        console.log(chalk.cyan(uuids[0]));
      } else {
        console.log(chalk.green(`✅ Generated ${count} UUIDs:`));
        uuids.forEach((uuid, index) => {
          console.log(chalk.cyan(`  ${index + 1}. ${uuid}`));
        });
      }

      if (options.clipboard && uuids.length > 0) {
        clipboardy.writeSync(uuids[0]);
        console.log(chalk.dim('📋 First UUID copied to clipboard'));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Add validate subcommand
uuidCmd
  .command('validate')
  .description('✅ Validate UUID format')
  .argument('<uuid>', 'UUID to validate')
  .action((uuid) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    
    if (uuidRegex.test(uuid)) {
      console.log(chalk.green('✅ Valid UUID format'));
      
      // Extract version
      const version = uuid.charAt(14);
      console.log(chalk.dim(`Version: ${version}`));
      
      // Show components
      const parts = uuid.split('-');
      console.log(chalk.dim('\nComponents:'));
      console.log(`  Time low:     ${parts[0]}`);
      console.log(`  Time mid:     ${parts[1]}`);
      console.log(`  Version/Time: ${parts[2]}`);
      console.log(`  Clock seq:    ${parts[3]}`);
      console.log(`  Node:         ${parts[4]}`);
    } else {
      console.log(chalk.red('❌ Invalid UUID format'));
      console.log(chalk.dim('Expected format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'));
    }
  });

module.exports = uuidCmd;
