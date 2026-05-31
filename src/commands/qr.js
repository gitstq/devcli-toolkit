const { Command } = require('commander');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');

const qrCmd = new Command('qr')
  .description('📱 QR code generator')
  .argument('<text>', 'Text or URL to encode')
  .option('-s, --small', 'Use small QR code')
  .action((text, options) => {
    try {
      console.log(chalk.green('📱 Generated QR Code:'));
      console.log(chalk.dim(`Content: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`));
      console.log('');

      qrcode.generate(text, { small: options.small }, (qrcode) => {
        console.log(qrcode);
      });
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

// Add WiFi QR subcommand
qrCmd
  .command('wifi')
  .description('📶 Generate WiFi connection QR code')
  .requiredOption('-s, --ssid <ssid>', 'WiFi SSID')
  .requiredOption('-p, --password <password>', 'WiFi password')
  .option('-t, --type <type>', 'Security type (WPA/WEP/nopass)', 'WPA')
  .option('--hidden', 'Hidden network')
  .action((options) => {
    try {
      const wifiString = `WIFI:T:${options.type};S:${options.ssid};P:${options.password};${options.hidden ? 'H:true;' : ''};`;
      
      console.log(chalk.green('📶 WiFi QR Code:'));
      console.log(chalk.dim(`SSID: ${options.ssid}`));
      console.log(chalk.dim(`Security: ${options.type}`));
      console.log('');

      qrcode.generate(wifiString, { small: false }, (qrcode) => {
        console.log(qrcode);
      });
      
      console.log(chalk.dim('\nScan with your phone camera to connect'));
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
    }
  });

module.exports = qrCmd;
