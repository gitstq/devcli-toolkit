const { Command } = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const crypto = require('crypto');

const passwordCmd = new Command('pass')
  .description('🔒 Password generator and strength checker')
  .option('-l, --length <number>', 'Password length', '16')
  .option('-n, --number <count>', 'Number of passwords', '1')
  .option('-u, --uppercase', 'Include uppercase letters')
  .option('-lo, --lowercase', 'Include lowercase letters')
  .option('-d, --digits', 'Include digits')
  .option('-s, --special', 'Include special characters')
  .option('--no-similar', 'Exclude similar characters (0, O, l, 1)')
  .option('-c, --clipboard', 'Copy first password to clipboard')
  .action((options) => {
    try {
      const length = parseInt(options.length) || 16;
      const count = parseInt(options.number) || 1;

      // Build character set
      let charset = '';
      if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (options.digits) charset += '0123456789';
      if (options.special) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

      // Default: all except special
      if (!charset) {
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      }

      // Remove similar characters
      if (options.similar === false) {
        charset = charset.replace(/[0O1l]/g, '');
      }

      const passwords = [];

      for (let i = 0; i < count; i++) {
        let password = '';
        for (let j = 0; j < length; j++) {
          const randomIndex = crypto.randomInt(0, charset.length);
          password += charset[randomIndex];
        }
        passwords.push(password);
      }

      if (count === 1) {
        console.log(chalk.green(`✅ Generated Password (${length} chars):`));
        console.log(chalk.cyan(passwords[0]));
        
        // Show strength
        const strength = checkStrength(passwords[0]);
        console.log(chalk.dim(`Strength: ${strength.label}`));
      } else {
        console.log(chalk.green(`✅ Generated ${count} Passwords (${length} chars each):`));
        passwords.forEach((pass, index) => {
          console.log(chalk.cyan(`  ${index + 1}. ${pass}`));
        });
      }

      if (options.clipboard && passwords.length > 0) {
        clipboardy.writeSync(passwords[0]);
        console.log(chalk.dim('📋 First password copied to clipboard'));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Add strength check subcommand
passwordCmd
  .command('check')
  .description('🔍 Check password strength')
  .argument('<password>', 'Password to check')
  .action((password) => {
    const strength = checkStrength(password);
    
    console.log(chalk.green('🔍 Password Strength Analysis:'));
    console.log(chalk.dim('────────────────────────────'));
    console.log(`Password: ${chalk.cyan('*'.repeat(password.length))}`);
    console.log(`Length:   ${chalk.cyan(password.length)} characters`);
    console.log(`Strength: ${strength.color(strength.label)}`);
    console.log(`Score:    ${chalk.cyan(strength.score)}/100`);
    
    if (strength.suggestions.length > 0) {
      console.log(chalk.yellow('\n💡 Suggestions:'));
      strength.suggestions.forEach(s => console.log(`  • ${s}`));
    }
  });

function checkStrength(password) {
  let score = 0;
  const suggestions = [];

  // Length check
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 15;
  if (password.length >= 16) score += 15;
  else suggestions.push('Use at least 16 characters for better security');

  // Character variety
  if (/[a-z]/.test(password)) score += 10;
  else suggestions.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score += 15;
  else suggestions.push('Add uppercase letters');

  if (/\d/.test(password)) score += 15;
  else suggestions.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score += 20;
  else suggestions.push('Add special characters (!@#$%^&*)');

  // Determine label and color
  let label, color;
  if (score >= 90) {
    label = '🔒 Very Strong';
    color = chalk.green;
  } else if (score >= 70) {
    label = '🟢 Strong';
    color = chalk.green;
  } else if (score >= 50) {
    label = '🟡 Medium';
    color = chalk.yellow;
  } else if (score >= 30) {
    label = '🟠 Weak';
    color = chalk.hex('#FFA500');
  } else {
    label = '🔴 Very Weak';
    color = chalk.red;
  }

  return { score, label, color, suggestions };
}

module.exports = passwordCmd;
